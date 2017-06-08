(function () {
    angular
        .module('proxyApp', [])
        .controller('proxyController', proxyController);

    function proxyController($http) {
        var model = this;
        model.searchSummoner = searchSummoner;
        model.searchMatch = searchMatch;
        var api_key = 'RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe';
        function searchSummoner(searchText) {
            var url3 = '/api/lol/summoner/byname/' + searchText;
             return $http.get(url3)
                 .then(function (response) {
                     model.summoner = response.data;
                     model.level = "summoner level: " + model.summoner.summonerLevel;
                     model.id = "account ID: " + model.summoner.accountId;
                     model.name = "username: " + model.summoner.name;
                     model.date = "last times visit: " + new Date(model.summoner.revisionDate);
                     model.summonerID = "summoner ID: " + model.summoner.id;

                 })


        }
        function searchMatch(accountId) {
            var url = '/api/lol/summoner/byAccountId/' + accountId;
            return $http.get(url)
                .then(function (response) {
                    model.matches = response.data.matches;

                })


        }
    }



})();
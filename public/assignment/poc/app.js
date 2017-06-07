(function () {
    angular
        .module('WAM')
        .controller('pocController', pocController);

    function pocController($http) {
        var model = this;
        model.searchSummoner = searchSummoner;
        model.searchMatch = searchMatch;
        var api_key = 'RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe';
        function searchSummoner(searchText) {
            var url1 = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + searchText + '?api_key=' + api_key;
             return $http.get(url1)
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
            var url = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/'+accountId
                +'/recent?api_key=' + api_key;
            return $http.get(url)
                .then(function (response) {

                    model.matches = response.data.matches;

                })


        }
    }



})();
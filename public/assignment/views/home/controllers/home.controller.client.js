(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);
    function homeController(currentUser, $http, $location) {
        var model = this;
        model.currentUser = currentUser;

        model.searchSummoner = searchSummoner;
        model.searchMatch = searchMatch;
        model.addToFollowing = addToFollowing;
        model.timeConverter = timeConverter;
        model.getNameForChampion = getNameForChampion;
        var api_key = 'RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe';
        function searchSummoner(searchText) {
            var url3 = '/api/lol/summoner/byname/' + searchText;
            return $http.get(url3)
                .then(function (response) {
                    model.summoner = response.data;
                    model.level = model.summoner.summonerLevel;
                    model.accountID = model.summoner.accountId;
                    model.name = model.summoner.name;
                    model.date = new Date(model.summoner.revisionDate);
                    model.summonerID =  model.summoner.id;

                })


        }
        function searchMatch(accountId) {
            var url = '/api/lol/summoner/byAccountId/' + accountId;
            return $http.get(url)
                .then(function (response) {
                    model.matches = response.data.matches;

                })
        }
        function addToFollowing(summoner) {
            var following ={
                summonerName: summoner.name,
                accountID: summoner.accountId,
                summonerID: summoner.id
            };

            var url = "/api/project/user/" + currentUser._id;
            return $http.post(url, following)
                .then(function (response) {
                    $location.url('/user/following');
                })
        }
        function timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        }
        function getNameForChampion(championId) {
            var url = '/api/lol/champion/byChampionId/' + championId;
            return $http.get(url)
                .then(function (response) {
                    return response.data.name;
                })
        }
    }
})();
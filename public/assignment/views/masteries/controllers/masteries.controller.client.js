(function () {
    angular
        .module('WAM')
        .controller('masteriesController', masteriesController);
    function masteriesController(currentUser, $routeParams, $http, $location) {
        var model = this;
        model.userId = currentUser._id;
        model.summonerId = $routeParams.summonerId;
        //eventHandler

        model.addToMasteries = addToMasteries;
        model.listSpecific = listSpecific;

        function getMasteriesPages() {
            var url = '/api/lol/masteries/bySummonerId/' + model.summonerId;
            return $http.get(url)
                .then(function (response) {
                    model.pages = response.data.pages;
                })
        }
        getMasteriesPages();

        function addToMasteries(page) {
            var url = '/api/lol/addMasteryPage/'+ model.userId;
            return $http.post(url, page)
                .then(function (response) {
                    $location.url('/profile/masteryCollections');
                })

        }

        function listSpecific(page) {
            var mas = page.masteries;
            var masteries = [];
            for (i = 0; i < mas.length; i++) {
                var curr = mas[i];
                var masteryId = curr.id;

                var url = '/api/lol/mastery/byMasteryId/' + masteryId;
                $http.get(url)
                    .then(function (response) {
                        var rank = curr.rank;
                        var mastery = response.data;
                        mastery.description = response.data.description[(rank - 1)];
                        mastery.imgUrl = "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/mastery/" + mastery.image.full;
                        masteries.push(mastery);
                    });

            }
            model.masteries = masteries;

        }


    }
})();





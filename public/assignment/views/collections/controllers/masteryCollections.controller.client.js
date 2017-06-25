(function () {
    angular
        .module('WAM')
        .controller('masteryCollectionsController', masteryCollectionsController);
    function masteryCollectionsController(currentUser,$http) {
        var model = this;
        model.userId = currentUser._id;
        //eventHandler

        model.deleteMasteries = deleteMasteries;
        model.showDetails = showDetails;

        function getMasteriesPages() {
            var url = '/api/lol/mastery/byuserId/' + model.userId;
            return $http.get(url)
                .then(function (response) {
                    model.pages = response.data;
                })
        }
        getMasteriesPages();

        function deleteMasteries(page) {
            var url = '/api/lol/deleteMasteryPage/'+ page._id;
            return $http.delete(url)
                .then(function (response) {
                    getMasteriesPages();
                })
        }

        function showDetails(page) {
            var masteries = page.masteries;
            var mass = [];
            for (i = 0; i < masteries.length; i++) {
                var curr = masteries[i];
                var masteryId = curr.id;
                var url = '/api/lol/mastery/byMasteryId/' + masteryId;
                $http.get(url)
                    .then(function (response) {
                        var mastery = response.data;
                        var rank = curr.rank;
                        mastery.imgUrl = "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/mastery/" + mastery.image.full;
                        mastery.description = response.data.description[(rank - 1)];
                        mass.push(mastery);
                    })
            }
            model.mass = mass;
        }

    }
})();





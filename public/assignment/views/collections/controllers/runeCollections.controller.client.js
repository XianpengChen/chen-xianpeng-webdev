(function () {
    angular
        .module('WAM')
        .controller('runeCollectionsController', runeCollectionsController);
    function runeCollectionsController(currentUser,$http) {
        var model = this;
        model.userId = currentUser._id;
        //eventHandler

        model.deleteRunes = deleteRunes;
        model.showDetails = showDetails;

        function getRunesPages() {
            var url = '/api/lol/runes/byuserId/' + model.userId;
            return $http.get(url)
                .then(function (response) {
                    model.pages = response.data;
                })
        }
        getRunesPages();

        function deleteRunes(page) {
            var url = '/api/lol/deleteRunePage/'+ page._id;
            return $http.delete(url)
                .then(function (response) {
                    getRunesPages();
                })

        }

        function showDetails(page) {
            var slots = page.slots;
            var runes = [];
            for (i = 0; i < slots.length; i++) {
                var runeId = slots[i];
                var url = '/api/lol/rune/byRuneId/' + runeId;
                $http.get(url)
                    .then(function (response) {
                        var rune = response.data;
                        rune.imgUrl = "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/rune/" + rune.image.full;
                        runes.push(rune);
                    })
            }
            model.runes = runes;

        }

    }
})();





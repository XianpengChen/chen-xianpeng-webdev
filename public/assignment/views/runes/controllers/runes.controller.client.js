(function () {
    angular
        .module('WAM')
        .controller('runesController', runesController);
    function runesController(currentUser, $routeParams, $http, $location) {
        var model = this;
        model.userId = currentUser._id;
        model.summonerId = $routeParams.summonerId;
        //eventHandler

        model.addToRunes = addToRunes;
        model.listSpecific = listSpecific;

        function getRunesPages() {
            var url = '/api/lol/runes/bySummonerId/' + model.summonerId;
            return $http.get(url)
                .then(function (response) {
                    model.pages = response.data.pages;
                })
        }
        getRunesPages();

        function addToRunes(page) {
            var url = '/api/lol/addRunePage/'+ model.userId;
            return $http.post(url, page)
                .then(function (response) {
                    $location.url('/profile/runeCollections');
                })

        }

        function listSpecific(page) {
            var slots = page.slots;
            var runes = [];
            for (i = 0; i < slots.length; i++) {
                var runeId = slots[i].runeId;
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





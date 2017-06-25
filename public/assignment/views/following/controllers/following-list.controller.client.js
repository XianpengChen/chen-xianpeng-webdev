(function () {
    angular
        .module('WAM')
        .controller('followingListController', followingListController);
    function followingListController(currentUser,followingService, $http) {
        var model = this;

        model.userId = currentUser._id;

        model.deleteFollowing = deleteFollowing;
        model.searchMatch = searchMatch;
        model.timeConverter = timeConverter;

        function init() {
            followingService
                .findAllFollowingsForUser(model.userId)
                .then(function (followings) {
                    model.followings = followings;
                });
        }
        init();

        function deleteFollowing(following) {
            var followingId = following._id;
            var url = "/api/project/following/" + followingId;
            return $http.delete(url)
                .then(function (response) {
                        init();
                })

        }
        function searchMatch(accountId) {
            var url = '/api/lol/summoner/byAccountId/' + accountId;
            return $http.get(url)
                .then(function (response) {
                    model.matches = response.data.matches;

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


    }
})();



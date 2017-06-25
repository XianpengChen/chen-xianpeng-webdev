(function () {
    angular
        .module('WAM')
        .controller('friendListController', friendListController);
    function friendListController(currentUser, $http, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.deleteFriend = deleteFriend;

        function init() {
            var url = '/api/user/findfriends/' + model.userId;
            $http.get(url)
                .then(function (response) {
                    model.friends = response.data[0].friends;
                })
        }
        init();

        function deleteFriend(friend) {
            var friendId = friend.id;
            var url = '/api/user/'+model.userId+'/friend/'+ friendId;
            return $http.delete(url)
                .then(function (response) {
                        init();
                })

        }





    }
})();



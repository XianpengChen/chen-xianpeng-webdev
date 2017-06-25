(function () {
    angular
        .module('WAM')
        .controller('friendSearchController', friendSearchController);
    function friendSearchController(currentUser, $http, $location) {
        var model = this;

        model.userId = currentUser._id;
        model.searchUser = searchUser;
        model.addToFriends = addToFriends;
        
        function searchUser(searchText) {
            var url = "/api/lol/finduserbyname/user/" + searchText;
            return $http.get(url)
                .then(function (response) {
                    if (!response.data.username) {
                        model.message = 'not found such user';
                    }
                    else {
                        model.username = response.data.username;
                        model.firstname = response.data.firstName;
                        model.lastname = response.data.lastName;
                        model.friendId = response.data._id;
                    }
                })

        }
        function addToFriends(friendId) {
            var url = "/api/lol/"+model.userId+"/addfriend/" + friendId;
            return $http.get(url)
                .then(function (response) {
                    $location.url('/profile/friends');
                })



        }
    }
})();



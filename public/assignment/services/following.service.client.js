
(function () {
    angular
        .module('WAM')
        .factory('followingService', followingService);

    function followingService($http) {


        return {
            findAllFollowingsForUser: findAllFollowingsForUser,
            createFollowing:createFollowing,
            findFollowingById: findFollowingById,
            deleteFollowing: deleteFollowing

        };
        function findAllFollowingsForUser(userId) {
            var url = "/api/project/user/"+userId+"/allFollowings";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }
        function createFollowing(userId, following) {
            var url = "/api/project/user/" + userId;
            return $http.post(url, following)
                .then(function (response) {
                    return response.data;
                })
        }

        function findFollowingById(followingId) {
            var url = "/api/project/following/" + followingId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }
        function deleteFollowing(followingId) {
            var url = "/api/project/following/" + followingId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })

        }



    }
})();
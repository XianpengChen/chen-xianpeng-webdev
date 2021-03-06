
(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        return  {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout:logout,
            checkLoggedIn: checkLoggedIn,
            register: register,
            checkAdmin: checkAdmin,
            findAllUsers: findAllUsers,
            unregister: unregister,
            findUserByUsername: findUserByUsername

        };
        function findUserByUsername(name) {
            var url = '/api/lol/finduserbyname/user/' + name;
            $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
        function checkAdmin() {
            var url = "/api/assignment/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }
        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/api/assignment/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/assignment/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });

        }
        
        function createUser(user) {
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;

                })
            
        }
        function updateUser(userId, user) {
            var url = "/api/assignment/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;

                });
            
        }
        function deleteUser(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;

                });

        }
        function unregister() {
            var url = "/api/assignment/unregister";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;

                }, function (err) {
                    console.log(err);
                });
        }

        
        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });

        }
        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;

                });
        }
        function findAllUsers() {
            var url = '/api/assignment/allUsers';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();
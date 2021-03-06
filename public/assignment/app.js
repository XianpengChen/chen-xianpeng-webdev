(function () {
    angular
        .module('WAM', ['ngRoute', 'textAngular'])
        .config(configuration);
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }

            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/runeCollections', {
                templateUrl: 'views/collections/templates/runeCollections.view.client.html',
                controller: 'runeCollectionsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/friends', {
                templateUrl: 'views/friends/templates/friend-list.view.client.html',
                controller: 'friendListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/searchUser', {
                templateUrl: 'views/friends/templates/friend-search.view.client.html',
                controller: 'friendSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/masteryCollections', {
                templateUrl: 'views/collections/templates/masteryCollections.view.client.html',
                controller: 'masteryCollectionsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/runes/:summonerId', {
                templateUrl: 'views/runes/templates/runes.view.client.html',
                controller: 'runesController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/masteries/:summonerId', {
                templateUrl: 'views/masteries/templates/masteries.view.client.html',
                controller: 'masteriesController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/user/following', {
                templateUrl: 'views/following/templates/following-list.view.client.html',
                controller: 'followingListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }

            })
            .when('/user/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }

            })
            .when('/user/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }

            })
            .when('/user/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-choose.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/new/heading', {
                templateUrl: 'views/widget/templates/widget-heading-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/new/text', {
                templateUrl: 'views/widget/templates/widget-text-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/new/image', {
                templateUrl: 'views/widget/templates/widget-image-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/new/youtube', {
                templateUrl: 'views/widget/templates/widget-youtube-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/new/html', {
                templateUrl: 'views/widget/templates/widget-html-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'flickrController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/poc', {
                templateUrl: 'poc/poc.html',
                controller: 'proxyController',
                controllerAS: 'model'
            });
    }
    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
    function checkCurrentUser(userService, $q) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;

    }
    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;

    }
})();

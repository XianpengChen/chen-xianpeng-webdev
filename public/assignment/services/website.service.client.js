
(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {


        return {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        function createWebsite(website) {

            var url = "/api/assignment/user/"+ website.developerId +"/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWebsite(websiteId, website) {
            var web = findWebsiteById(websiteId);
            web.name = website.name;
            web.description = website.description;

            var url = "/api/website/"+ websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                })


        }

        function deleteWebsite(websiteId) {


            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;

                })
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function findAllWebsitesForUser(userId) {
           var url = "/api/assignment/user/"+ userId +"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
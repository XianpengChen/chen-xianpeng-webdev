
(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        return  {
            createWebsite: createWebsite,
            findWebsiteByUser: findWebsiteByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser

        };

        function createWebsite(userId, website) {
           website.developerId = userId;
            website.created = new Date();
            website.updated = new Date();
           websites.push(website);

        }
        function updateWebsite(websiteId, website) {


        }
        function deleteWebsite(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            })
            var index = websites.indexOf(website);
            websites.splice(index, 1);

        }
        function findWebsiteByUser(userId) {

        }



        function findWebsiteById(websiteId) {
            return websites.find( function (website) {
                return website._id === websiteId;
            });

        }
        function findAllWebsitesForUser(userId) {
            var resultSet = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {

                    resultSet.push(websites[w]);
                }
            }
            return resultSet;

        }
    }
})();
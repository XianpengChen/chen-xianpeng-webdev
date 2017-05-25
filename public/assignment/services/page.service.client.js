(function () {
    angular
        .module('WAM')
        .factory('PageService', PageService);

    function PageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];
        return  {
            createPage: createPage,
            findPageByUser: findPageByUser,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {


        }
        function updatePage(pageId, page) {


        }
        function deletePage(pageId) {


        }
        function findPageByUser(userId) {

        }



        function findPageById(pageId) {

        }
    }
})();

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];
        return  {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);


        }
        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var w in pages) {
                if(pages[w].websiteId === websiteId) {
                    resultSet.push(pages[w]);
                }
            }
            return resultSet;


        }
        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });



        }

        function updatePage(pageId, page) {
            var pag = findPageById(pageId);
            pag.name = page.name;
            pag.description = page.description;
        }
        function deletePage(pageId) {
            var pag = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(pag);
            pages.splice(index, 1);


        }

    }
})();

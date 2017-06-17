(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    function pageEditController(currentUser, $routeParams, pageService, $location) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;


        //eventHandler
        model.updatePage = updatePage;
        model.deletePage = deletePage;


        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService.findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                })
        }
        init();

        function updatePage(page) {
            pageService.updatePage( model.pageId, page)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page');
                })


        }
        function deletePage(pageId) {
            pageService.deletePage(pageId)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page');
                })



        }
    }
})();




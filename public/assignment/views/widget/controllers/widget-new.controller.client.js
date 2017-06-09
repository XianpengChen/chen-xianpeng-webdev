(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.createHeadingWidget = createHeadingWidget;
        model.createImageWidget = createImageWidget;
        model.createYoutubeWidget = createYoutubeWidget;

        function createHeadingWidget(widget) {
            widget.type = "HEADING";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function createImageWidget(widget) {
            widget.type = "IMAGE";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function createYoutubeWidget(widget) {
            widget.type = "YOUTUBE";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

    }
})();

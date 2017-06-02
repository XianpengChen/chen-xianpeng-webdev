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
            widget.widgetType = "HEADING";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function createImageWidget(widget) {
            widget.widgetType = "IMAGE";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function createYoutubeWidget(widget) {
            widget.widgetType = "YOUTUBE";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

    }
})();

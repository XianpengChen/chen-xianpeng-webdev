(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController(currentUser, $routeParams, widgetService, $location) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.createHeadingWidget = createHeadingWidget;
        model.createImageWidget = createImageWidget;
        model.createYoutubeWidget = createYoutubeWidget;
        model.createHtmlWidget = createHtmlWidget;
        model.createTextWidget = createTextWidget;

        function createHeadingWidget(widget) {
            widget.type = "HEADING";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function createImageWidget(widget) {
            widget.type = "IMAGE";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

        function createYoutubeWidget(widget) {
            widget.type = "YOUTUBE";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }
        function createHtmlWidget(widget) {
            widget.type = "HTML";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }
        function createTextWidget(widget) {
            widget.type = "TEXT";
            widgetService.createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        }

    }
})();

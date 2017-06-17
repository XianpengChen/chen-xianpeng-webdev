(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController(currentUser, $location, $routeParams, widgetService) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;



        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
            widgetService.findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })

        }
        init();


        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });


        }
        function deleteWidget(widget) {
            widgetService.deleteWidget(model.widgetId)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })


        }

    }
})();

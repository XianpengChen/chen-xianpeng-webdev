(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location,$routeParams, widgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;



        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);

        }
        init();



        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');

        }
        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');

        }

    }
})();

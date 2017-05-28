(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;



        //event handler
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.trustThisContent = trustThisContent;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.getWidgetId = getWidgetId;

        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);
        }
        init();




        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
            
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);


        }
        function getWidgetId(widget) {

            return widget._id;
        }
        
        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
            
        }

    }
})();

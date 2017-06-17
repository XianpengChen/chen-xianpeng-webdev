(function () {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController(currentUser, flickrService, $routeParams, widgetService, $location) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            widgetService.findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })
        }
        init();

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;



                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            model.widget.url = url;


            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+ model.widgetId);
                });


        }


    }
})();

(function () {
    angular
        .module('WAM')
        .directive('wdDraggable', wdDraggable);
    
    function wdDraggable($http, $routeParams) {

        function linkFunction(scope, element) {
            var initialArray = [];
            var afterArray = [];

            $(element).sortable({start: function(event, item) {

                initialArray = $(element).sortable( "toArray" );
            }
                });
            $(element).sortable({stop: function(event, ui) {
                afterArray = $(element).sortable("toArray");
                console.log(afterArray);

                for(i = 0; i < initialArray.length; i++) {
                    if (initialArray[i] !== afterArray[i]) {
                        var initial = i;
                        var final = afterArray.indexOf(initialArray[i]);
                        var url = '/api/page/'+$routeParams.pageId+'/widget?initial='+initial+'&final='+final;
                        return $http.put(url)
                            .then(function (response) {
                                return response.data;
                            });

                    }
                }

            }
            });






        }
        return {
            link: linkFunction
        }

    }
})();
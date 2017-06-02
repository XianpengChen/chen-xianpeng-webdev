(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('order', order);
    
    function order() {
        function linkFunction(scope, element, attrs) {
            $(element).sortable();

        }
        return {
            link: linkFunction
        }

    }
})();
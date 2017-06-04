(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wdSortable', wdSortable);
    
    function wdSortable() {
        function linkFunction(scope, element) {
            $(element).sortable();

        }
        return {
            link: linkFunction
        }

    }
})();
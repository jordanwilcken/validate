(function() {
  'use strict';

  angular
    .module('validate')
    .directive('checkAvailable', checkAvailable);

  checkAvailable.$inject = ['$q', '$timeout'];
  
  function checkAvailable($q, $timeout) {
    return {
      require: 'ngModel',
      link: link
    }
    
    function link(scope, element, attrs, ctrl) {
      ctrl.$asyncValidators.checkAvailable = checkAvailable;
      
      function checkAvailable(modelValue, viewValue) {
        var
          theDate = new Date(2015, 4, 21),
          def = $q.defer();

        if (ctrl.$isEmpty(modelValue)) {
          return $q.when();
        }
      
        $timeout(function() {
          if (modelValue.getDay() !== theDate.getDay()) {
            def.resolve();
          } else {
            def.reject();
          }
        }, 2000);

        return def.promise;
      }
    }
  }
}())

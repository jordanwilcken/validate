/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $,angular*/

(function () {
  var CAT_REGEX = /[A-Z]{3}/;

  angular.module("validate").

    directive('catValidator', function () {

      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
          ctrl.$validators.catValidator = function(modelValue, viewValue) {
            return (CAT_REGEX.test(viewValue));
          };
        }
      };
    });
}());

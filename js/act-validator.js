/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $,angular*/

(function () {
  var ACT_REGEX = /^(\+|-|I|M|R|&)$/;

  angular.module("validate").

    directive('actValidator', function () {

      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
          ctrl.$validators.actValidator = function(modelValue, viewValue) {
            return (ACT_REGEX.test(viewValue));
          };
        }
      };
    });
}());

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $,angular*/

(function () {
  var app = angular.module("validate", []);

  app.controller('LookMomController', [
	'$rootScope',
	'$http',
	'$sce',
	'topicInfo',
	function ($rootScope, $http, $sce, topicInfo) {
    var 
      overviewTemplateUrl,
      excludeUnfairFilter = function (handShape) {
        var regex = /everything/i;
        if (!regex.test(handShape.beats)) {
          return handShape;
        } 
      },
      topicInfo = topicInfo.getTopicInfo();
    
    $rootScope.setPedanticContent = function (template) {
      $http.get(template).success(function (data) { $rootScope.pedanticContent = $sce.trustAsHtml(data); } );     
    };
    
    overviewTemplateUrl = topicInfo.filter(function (topic) { return topic.name === "Overview" })[0].templateUrl;
    $rootScope.setPedanticContent(overviewTemplateUrl);
    
    $rootScope.topicInfo = topicInfo;
    
    $rootScope.onClick = function (topicName) {
      if (topicName === "Scopes") {
        $rootScope.$broadcast("ShowTheScope");
      } else {
        $rootScope.$broadcast("HideTheScope");
      }
    };

    $rootScope.shapesFilter = excludeUnfairFilter;

    $rootScope.toggleShapesFilter = function () {
      if ($rootScope.shapesFilter) {
        $rootScope.shapesFilter = undefined;
      } else {
        $rootScope.shapesFilter = excludeUnfairFilter;
      }
    };
  }]);

  app.factory('topicInfo', function() {
    var
      getTopicInfo;

    getTopicInfo = function() {
      return [
        { name: "Overview",             templateUrl: "overview.html" },
        { name: "Data Binding",         templateUrl: "data-binding.html" },
        { name: "Controllers",          templateUrl: "controllers.html" },
        { name: "Services",             templateUrl: "services.html" },
        { name: "Scopes",               templateUrl: "scopes.html" },
        { name: "Dependency Injection", templateUrl: "dependency-injection.html" },
        { name: "Templates",            templateUrl: "templates.html" },
        { name: "Expressions",          templateUrl: "expressions.html" },
        { name: "Filters",              templateUrl: "filters.html" },
        { name: "Forms",                templateUrl: "forms.html" },
        { name: "Directives",           templateUrl: "directives.html" },
        { name: "Animations",           templateUrl: "animations.html" },
        { name: "Modules",              templateUrl: "modules.html" },
        { name: "Unit Testing",         templateUrl: "unit-testing.html" },
        { name: "Security",             templateUrl: "security.html" }
      ];
    };

    return {
      getTopicInfo: getTopicInfo
    };
  });

}());

var app = angular.module("app", ['AthleteApp', 'ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'templates/basicInfo.html',
            controller: 'MainCtrl'
        })
        .when('/about', {
            templateUrl: 'templates/about.html',
            controller: 'MainCtrl'
        })
        .when('/wrapup', {
            templateUrl: 'templates/wrap-up.html',
            controller: 'WrapUpCtrl'
        })
        .when('/list', {
            templateUrl: 'templates/list.html',
            controller: 'basicInfoController'
        })
        .otherwise({
            template : "<h1>None</h1><p>This URL is not expected.</p>"
        });
});

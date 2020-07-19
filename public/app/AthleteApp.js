var controllersApp = angular.module('AthleteApp', []);
var vm = this;

controllersApp.controller('basicInfoController',function($scope, dataService){
  $scope.athletes = [];
  dataService.getData().then(function(dataResponse)
  {
      $scope.athletes = dataResponse.data;
  });
})

controllersApp.service('dataService', function($http) {
    this.getData = function() {
        return $http({
            method: 'GET',
            url: 'https://opensponsorship-challenge.herokuapp.com/profiles'
        });
    }
});

var data = []
var cache = {}

controllersApp.controller('MainCtrl', function($scope, $http, $rootScope) {
  updateView = false;
  $scope.info = cache;
  $scope.gender = cache.gender;
  $scope.genderSelected  = "";
  $scope.RadioChange = function (s) {
    $scope.genderSelected = s;
    $scope.info.gender = $scope.genderSelected;
  };
  $scope.married = cache.married;
  $scope.selected  = "";
  $scope.RadioMarried = function (s) {
    $scope.selected = s;
    $scope.info.married = $scope.selected;
  };
  $scope.da = cache.da;
  $scope.selectedOpt  = "";
  $scope.RadioDA = function (s) {
    $scope.selectedOpt = s;
    $scope.info.da = $scope.selectedOpt;
  };
  $scope.save = function() {
    if($scope.inputSports) {
      $scope.info.sports = $scope.inputSports;
    }
    if($scope.inputSMH) {
      $scope.info.social = $scope.inputSMH;
    }
    sessionStorage.setItem("info", JSON.stringify($scope.info));
    var res = JSON.parse(sessionStorage.getItem("info"));
    data.push(res);
    for(var _obj in cache) cache[_obj ]=cache[_obj];
    for(var _obj in res) cache[_obj ]=res[_obj];
  }
});

controllersApp.controller('WrapUpCtrl', function($scope, $http, $rootScope) {
  $scope.getValues = function() {
    $scope.enteredData = cache;
  }

  $scope.submit = function(){
    return $http({
        method: 'POST',
        url: 'https://opensponsorship-challenge.herokuapp.com/profile',
        data: {
            "basic_info": {
                "name": cache.inputName,
                "dob": cache.inputDob,
                "nationality": cache.inputNationality,
                "location": cache.inputLocation,
                "association": cache.inputAssociation,
                "team": cache.inputTeam,
                "gender": cache.gender,
                "sports": cache.sports
              },
              "about": {
                "interests": cache.inputInterests,
                "charities": cache.inputCharities,
                "pets": cache.inputPets,
                "drinks_alcohol": cache.da,
                "married": cache.married
              },
              "social_media_handles": cache.social
        }
    }).then(function(response) {
          console.log("Success response "+JSON.stringify(response));
          sessionStorage.clear();
    }).catch(function(err) {
          console.log("Failure response "+JSON.stringify(err));
    });
  }
})

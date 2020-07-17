var controllersApp = angular.module('AthleteApp', []);

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
            url: 'http://localhost:8080/profiles'
        });
    }
});

var data = []
controllersApp.controller('MainCtrl', function($scope, $http, $rootScope) {
    $scope.gender = "Male";
    $scope.genderSelected  = "";
    $scope.RadioChange = function (s) {
        $scope.genderSelected = s;
        console.log($scope.genderSelected);
        $scope.info.gender = $scope.genderSelected;
    };
    $scope.married = "Yes";
    $scope.selected  = "";
    $scope.RadioMarried = function (s) {
        $scope.selected = s;
        console.log($scope.selected);
        $scope.info.married = $scope.selected;
    };
    $scope.da = "yes";
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
    }

    $scope.submit = function(){
      console.log(data);
      return $http({
          method: 'POST',
          url: 'http://localhost:8080/profile',
          data: {
            "basic_info": {
              "name": data[0].inputName,
              "dob": data[0].inputDob,
              "nationality": data[0].inputNationality,
              "location": data[0].inputLocation,
              "association": data[0].inputAssociation,
              "team": data[0].inputTeam,
              "gender": data[0].gender,
              "sports": data[0].sports
            },
            "about": {
              "interests": data[1].inputInterests,
              "charities": data[1].inputCharities,
              "pets": data[1].inputPets,
              "drinks_alcohol": data[1].da,
              "married": data[1].married
            },
            "social_media_handles": data[1].social
          }
          }).then(function(response) {
              console.log("Success response "+JSON.stringify(response));
          }).catch(function(err) {
              console.log("Failure response "+JSON.stringify(err));
          });
    }
});

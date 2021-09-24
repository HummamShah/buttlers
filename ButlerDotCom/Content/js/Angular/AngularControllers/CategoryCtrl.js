'use strict';
app.controller('CategoryCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        "Upload",
        "toaster",
        "moment",
        function ($scope, $rootScope, $timeout, $q, $window, $http, Upload, toaster, moment) {
            $scope.init = function () {
                $scope.ListingOptions.Url = '/api/CategoryApi/GetListing';
                $scope.InitListing();
            }
            $scope.AddInit = function () {
                $scope.Category = {};
            }
            $scope.AddCategory = function (Category) {
                console.log(Category);
                $scope.AjaxPost("/api/CategoryApi/AddCategory", Category).then(
                    function (response) {
                        if (response.status == 200) {
                            toaster.pop('success', "success", "text");
                            $timeout(function () { window.location.href = '/Category'; }, 2000);
                        } else {
                            toaster.pop('error', "erroe", "Could not add Category");
                        }
                    });
            }
            
        }]);
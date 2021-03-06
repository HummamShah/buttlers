'use strict';
app.controller('CategoryCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        "toaster",
        "moment",
        function ($scope, $rootScope, $timeout, $q, $window, $http, toaster, moment) {
            $scope.init = function () {
                
            }
            $scope.AddInit = function () {
                $scope.Category = {};
                if ($scope.GetUrlParameter("Id") != null) {
                    var Id = $scope.GetUrlParameter("Id");
                    var data = {
                        Id: parseInt(Id)

                    }
                    console.log(data);
                    $scope.AjaxGet("/api/CategoryApi/GetCategory", data).then(
                        function (response) {
                            if (response.status == 200) {
                                console.log(response)
                                $scope.Category = response.data;
                            }
                            else {
                                toaster.pop('error', "error", "Not  foound")
                            }
                        });
                }
            }
            $scope.AddCategory = function (Category) {
                console.log(Category);
                $scope.AjaxPost("/api/CategoryApi/AddCategory", Category).then(
                    function (response) {
                        if (response.status == 200) {
                            toaster.pop('success', "success", "text");
                            $timeout(function () { window.location.href = '/Category'; }, 2000);
                        } else {
                            toaster.pop('error', "error", "Could not add Category");
                        }
                    });
            }

            $scope.EditSecurityCompany = function (Category) {
                console.log(Category);
                $scope.AjaxPost("/api/CategoryApi/EditCategory", Category).then(
                    function (response) {
                        if (response.status == 200) {
                            toaster.pop('success', "success", "Security Company Update Successfully!");
                            $timeout(function () { window.location.href = '/Category/Index' }, 2000);
                        }
                        else {
                            toaster.pop('error', "error", "Could Not Update Security Company");
                        }
                    });
            }

        }]);
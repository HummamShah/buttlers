angular.module('main', ['toaster'])

'use strict';
app.controller('baseCtrl',
    [
        "$scope",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "$http",
        "toaster",
        "moment",
        function ($scope, $rootScope, $timeout, $q, $window, $http, toaster,moment) {
            console.log("Connected to TIMS App base ctrl");
            //Url Parameter Start
            $scope.GetUrlParameter = function (param) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                return urlParams.get(param);
            }
            //Url Parameter End
            //AjaxServices Start
            $scope.IsServiceRunning = false;
            $scope.ServiceClassBinder = "LoaderDeActivate"; // bydefualt loader is deactivated
            $scope.TotalNumberOfServicesRunning = 0;
            $scope.AjaxGet = function (link, data) {
                $scope.ServiceClassBinder = "LoaderActivate"; // Loader class Activated
                $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning + 1;
                var promise = $http.get(link, { params: data, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        if (response.data.Success) {

                        } if (!response.data.Success) {
                            angular.forEach(response.data.ValidationErrors, function (value, key) {
                                alert(value);
                            }); 
                        }
                        $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning - 1;
                        $scope.ServiceClassBinder = "LoaderDeActivate"; // Loader class DeActivated
                        console.log(response);

                    }, function (resp) {
                        console.log(resp);
                        //toaster.pop('error', "error", resp.status + "! Internal Error");
                        $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning - 1;
                        $scope.ServiceClassBinder = "LoaderDeActivate"; // Loader class DeActivated
                    }
                );
                return promise;
            }
            $scope.AjaxGetBackground = function (link, data) {
                var promise = $http.get(link, { params: data, headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {
                        //success

                    }, function (resp) {
                        //error
                    }
                );
                return promise;
            }
            $scope.AjaxPost = function (link, data) {
                $scope.ServiceClassBinder = "LoaderActivate"; // Loader class Activated
                $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning + 1;
                var promise = $http.post(link, data, { headers: { 'Accept': 'application/json' } });
                promise.then(
                    function (response) {

                        $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning - 1;
                        $scope.ServiceClassBinder = "LoaderDeActivate"; // Loader class DeActivated
                        console.log(response);

                    }, function (resp) {
                        console.log(resp);
                        //toaster.pop('error', "error", resp.status + "! Internal Error");
                        $scope.TotalNumberOfServicesRunning = $scope.TotalNumberOfServicesRunning - 1;
                        $scope.ServiceClassBinder = "LoaderDeActivate"; // Loader class DeActivated
                    }
                );
                return promise;
            }
            $scope.ListingOptions = {
                CurrentPage: 1,
                PageSize: 100,
                TotalRecords: 20,
                Url: ''
            }

            //test
            $scope.Pop = function () {
                toaster.pop('success', "success", "text");
            }



            $scope.Export = function () {
                var wb = XLSX.utils.table_to_book(document.getElementById('mytable'));
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)],
                    { type: "application/octet-stream" }), 'test.xlsx');
            }
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }


            //sorting and search
            $scope.Sorting = {
                IsAscending : true,
                Field: "",
                AscClass: "active-sort",
                DescClass:"inactive-sort"
            };
            $scope.SetSortingColoumn = function (Field) {
                $scope.Sorting.Field = Field;
                $scope.Sorting.IsAscending = !$scope.Sorting.IsAscending;
                if ($scope.Sorting.IsAscending) {
                    $scope.Sorting.AscClass = "active-sort";
                    $scope.Sorting.DescClass = "inactive-sort";
                }
                if (!$scope.Sorting.IsAscending) {
                    $scope.Sorting.AscClass = "inactive-sort";
                    $scope.Sorting.DescClass = "active-sort";
                }
            }
            //chart.js

            $scope.initDashboard = function () {

                $scope.labels_SiteFeul = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JLY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                $scope.series_SiteFeul = ['Series A', 'Series B'];
               
                $scope.data_SiteFeul  = [
                    [65, 59, 80, 81, 55, 46, 50,50,23,88,21,32],
                    [28, 48, 40, 19, 86, 27, 90,34,78,23,12,89]
                ];

                $scope.labels1 = ['2001', '2007', '2008', '2009', '2010', '2011', '2012'];
                $scope.series1 = ['Series A', 'Series B'];

                $scope.data1 = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];

                $scope.labels_SiteSharing = ['Mobilink', 'Ufone', 'Zong', 'Telenor', 'PTCL'];
                $scope.series_SiteSharing = ['Site Sharing'];

                $scope.data_SiteSharing = [
                    [95, 79, 65, 51, 44]
                    
                ];

                $scope.Site_Tower_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                $scope.Site_Tower_series= ['Active', 'Non-Active'];
                //Chart.defaults.global.colors = ['#46BFBD', '#FDB45C'];

                //Tickets Statistics
                $scope.Site_Tower_data = [
                    [3, 2, 1, 0, 3, 3, 4, 3, 2, 0, 5, 1],
                    [5, 6, 4, 6, 2, 7, 6, 6, 4, 5, 7, 8]
                ];

                $scope.Tickets_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                $scope.Tickets_series = ['Pending', 'Resolved'];
                //Chart.defaults.global.colors = ['#46BFBD', '#FDB45C'];

                $scope.Tickets_data = [
                    [3, 2, 1, 0, 3, 3, 4, 3, 2, 0, 5, 1],
                    [5, 6, 4, 6, 2, 7, 6, 6, 4, 5, 7, 8]
                ];

                //TicketsByDate-Graph
                $scope.TicketsByDate_labels = ["Open", "Resolved" ,"Pending"];
                $scope.TicketsByDate_data = [9, 7, 2];

                //ONM projects-graph
                $scope.ONM_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                $scope.ONM_series = ['Approved', 'Pending',"Resolved"];
                $scope.ONM_data = [
                    [3, 2, 1, 0, 3, 3, 4, 3, 2, 0, 5, 1],
                    [5, 6, 4, 6, 2, 7, 6, 6, 4, 5, 7, 8],
                    [7, 9, 10, 8, 5, 2, 8, 12, 9, 5, 12, 6]
                ];

                //Network Implementation projects-graph
                $scope.NI_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                $scope.NI_series = ['Approved', 'Pending', "Resolved"];
                $scope.NI_data = [
                    [3, 2, 1, 0, 3, 3, 4, 3, 2, 0, 5, 1],
                    [5, 6, 4, 6, 2, 7, 6, 6, 4, 5, 7, 8],
                    [7, 9, 10, 8, 5, 2, 8, 12, 9, 5, 12, 6]
                ];
            }
            $scope.GetDatePostFormat = function (date) {
                return moment(date).format("YYYY-MMM-DD")
            }
            $scope.GetDateTimePostFormat = function (date) {
                return moment(date).format("YYYY-MMM-DD hh:mm a")
            }
            
            
     }
        ]);
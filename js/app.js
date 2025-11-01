// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular
  .module("starter", [
    "ionic",
    "starter.controllers",
    "starter.services",
    "ngSanitize"
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        StatusBar.styleDefault();
        StatusBar.backgroundColorByName("white");
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state("faq", {
        url: "/faq",
        templateUrl: "templates/faq.html",
        controller: "FaqCtrl"
      })
      //  .state('faqchild', {
      //    url: '/faq/:faqId',
      //    templateUrl: 'templates/faq-child.html',
      //    controller: 'FaqChildCtrl'
      //  })
      .state("faqchild1", {
        url: "/faq/faq1",
        templateUrl: "templates/faq1.html",
        controller: "FaqChildCtrl"
      })
      .state("faqchild2", {
        url: "/faq/faq2",
        templateUrl: "templates/faq2.html",
        controller: "FaqChildCtrl"
      })
      .state("faqchild3", {
        url: "/faq/faq3",
        templateUrl: "templates/faq3.html",
        controller: "FaqChildCtrl"
      })
      .state("faqchild4", {
        url: "/faq/faq4",
        templateUrl: "templates/faq4.html",
        controller: "FaqChildCtrl"
      })
      .state("faqchild5", {
        url: "/faq/faq5",
        templateUrl: "templates/faq5.html",
        controller: "FaqChildCtrl"
      })
      .state("terms", {
        url: "/faq/terms",
        templateUrl: "templates/terms.html"
        //controller: 'FaqChildCtrl'
      })
      .state("privacy", {
        url: "/faq/privacy",
        templateUrl: "templates/privacy.html"
        //controller: 'FaqChildCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/faq");
  })

  .controller("AppCtrl", function(
    $scope,
    $ionicPlatform,
    $ionicLoading,
    $ionicPopup,
    $ionicPopover
  ) {
    $scope.data = {
      allowScroll: false,
      statusbarPadding: false
    };
    document.body.classList.add("platform-ios");

    var productIds = ["b737normalsub1", "b737normalsub2", "b737normalsub4"]; // <- Add your product Ids here
    var spinner =
      '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

    $scope.loadProducts = function() {
      $ionicLoading.show({ template: spinner + "Loading Products..." });

      var isOffline = "onLine" in navigator && !navigator.onLine;
      if (isOffline) {
        $(".restoreText").hide();
        $(".textBtn").hide();

        $("p.ifOfflineText").show();
        $ionicLoading.hide();
      } else {
        $(".restoreText").show();
        $(".textBtn").show();
        $("p.ifOfflineText").hide();
        inAppPurchase
          .getProducts(productIds)
          .then(function(products) {
            $ionicLoading.hide();
            $scope.products = products;
          })
          .catch(function(err) {
            $ionicLoading.hide();
            //console.log(err);
          });
      }
    };

    //    ************************************************ BUYING SUBSCRIPTION ************************************************
    //    ************************************************ BUYING SUBSCRIPTION ************************************************
    //    ************************************************ BUYING SUBSCRIPTION ************************************************
    //    ************************************************ BUYING SUBSCRIPTION ************************************************
    //    ************************************************ BUYING SUBSCRIPTION ************************************************
    //    ************************************************ BUYING SUBSCRIPTION ************************************************
    $scope.buy = function(productId) {
      var isOffline = "onLine" in navigator && !navigator.onLine;
      if (isOffline) {
        //local db
        //console.log('offline');
        $ionicPopup.alert({
          title: "No internet connection",
          template: "Please check your internet connection and try again."
        });
      } else {
        $ionicLoading.show({ template: spinner + "Purchasing..." });
        inAppPurchase
          .buy(productId)
          .then(function(data) {
            //console.log(JSON.stringify(data));
            //console.log('consuming transactionId: ' + data.transactionId);
            try {
              var posting = $.post("https://iosappservice.cbt.aero/index.php", {
                receipt: data.receipt
              });

              posting.done(function(data) {
                var obj = JSON.parse(data);
                var resultCode = obj["resultCode"];
                var expirationDate = obj["expirationDate"];

                if ((resultCode = "0")) {
                  // console.log('Result code: ' + resultCode);
                  //console.log("Expiration date: " + expirationDate);
                  if (expirationDate != "expired") {
                    //console.log('Not expired.');

                    //writeToFile('sub.json', { subscribed: 'true', date: expirationDate });
                    var str =
                      '{"subscribed": true, "date": ' + expirationDate + "}";
                    ss.set(
                      function(key) {
                        /*console.log('Buying: Set ' + key);*/
                      },
                      function(error) {
                        /*console.log('Buying: Error ' + error);*/
                      },
                      ssk,
                      str
                    );

                    //$("#pano").show();
                    hideIntroScreen();
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                      title: "Subscription was successful!"
                    });
                    //$("ion-pane").css('pointer-events','none').css('background','rgba(0,0,0,0.0)');
                  } else {
                    //console.log('Expired!!');
                    //writeToFile('sub.json', { subscribed: 'false', date: null });
                    var str = '{"subscribed": false, "date": null}';
                    ss.set(
                      function(key) {
                        /*console.log('Set ' + key);*/
                      },
                      function(error) {
                        /*console.log('Error ' + error);*/
                      },
                      ssk,
                      str
                    );

                    //$("#pano").hide();
                    showIntroScreen();
                    //$("ion-pane").css('pointer-events','all').css('background','rgba(0,0,0,0.8)');
                  }
                  //save to file and then validation from file
                } else {
                  //console.log('There was an error with retrieving the data.');
                }
              });

              //writeToFile('rc.json', { receipt: data.receipt});
              var str = '{"receipt": "' + data.receipt + '"}';
              ss.set(
                function(key) {
                  /*console.log('Here Set ' + key);*/
                },
                function(error) {
                  /*console.log('Here Error ' + error);*/
                },
                ssk2,
                str
              );

              return inAppPurchase.consume(
                data.type,
                data.receipt,
                data.signature
              );
            } catch (err) {
              $ionicLoading.hide();
              //console.log('Catched error: ' + err.message);
              showIntroScreen();
              $scope.loadProducts();
            }
          })
          .then(function() {
            $ionicLoading.hide();
            //            var alertPopup = $ionicPopup.alert({
            //                title: 'Subscription was successful!'
            //            });
            //console.log('consume done!');
          })
          .catch(function(err) {
            $ionicLoading.hide();
            //console.log(err);
            $ionicPopup.alert({
              title: "Something went wrong",
              template:
                "Please try again. If the problem persists, contact our support."
            });
          });
      }
    };

    //******************** VERIFY HERE ********************************************************************************
    //******************** VERIFY HERE ********************************************************************************
    //******************** VERIFY HERE ********************************************************************************
    //******************** VERIFY HERE ********************************************************************************
    //******************** VERIFY HERE ********************************************************************************
    //******************** VERIFY HERE ********************************************************************************
    //******************** VERIFY HERE ********************************************************************************
    $scope.verifyReceipt = function() {
      $ionicLoading.show({ template: spinner + "Verifying subscription..." });

      var isOffline = "onLine" in navigator && !navigator.onLine;
      if (isOffline) {
        //local db
        //console.log('offline');

        checkExpiredOffline();
        $ionicLoading.hide();
      } else {
        // internet data
        //console.log('online');

        //            var store = cordova.file.syncedDataDirectory;
        //            var fileName = 'rc.json';
        //check if file exists
        //window.resolveLocalFileSystemURL(store + fileName, function(){

        ss.get(
          function(value) {
            //console.log('Verify 1: Success, got ' + value);
            try {
              var jsonData = JSON.parse(value);
              for (dataKey in jsonData) {
                if (jsonData.hasOwnProperty(dataKey)) {
                  var receiptData = jsonData.receipt;
                }
              }
              //console.log('1Receipt from file: ' + receiptData);

              if (receiptData != null) {
                var posting = $.post(
                  "https://iosappservice.cbt.aero/index.php",
                  { receipt: receiptData }
                )
                  .done(function(data) {
                    var obj = JSON.parse(data);
                    if (obj["notPurchased"] == true) {
                      //console.log('Not yet purchased');
                      $ionicLoading.hide();
                      $ionicPopup.alert({
                        title: "You have not purchased any subscription yet."
                      });
                      ss.remove(
                        function(key) {
                          /*console.log('Removed ' + key);*/
                        },
                        function(error) {
                          /*console.log('Error, ' + error);*/
                        },
                        ssk2
                      );
                    } else {
                      var resultCode = obj["resultCode"];
                      var expirationDate = obj["expirationDate"];
                      //console.log('Result code:' + resultCode);
                      if ((resultCode = "0")) {
                        // console.log('Result code: ' + resultCode);
                        //console.log('Expiration date: ' + expirationDate);
                        if (expirationDate != "expired") {
                          //console.log('Not expired.');

                          //writeToFile('sub.json', { subscribed: 'true', date: expirationDate });
                          var str =
                            '{"subscribed": true, "date": ' +
                            expirationDate +
                            "}";
                          ss.set(
                            function(key) {
                              /*console.log('Verify 2: Set ' + key);*/
                            },
                            function(error) {
                              /*console.log('Verify 2: Error ' + error);*/
                            },
                            ssk,
                            str
                          );

                          //$("#pano").show();
                          hideIntroScreen();
                          $ionicLoading.hide();

                          var storage = window.localStorage;
                          var value = storage.getItem("openNr"); // Pass a key name to get its value.

                          if (!parseInt(value)) {
                            value = 1;
                          } else {
                            value++;
                          }

                          if (value % 5 == 0) {
                            SKStoreReviewController.requestReview();
                          }
                          storage.setItem("openNr", value);

                          //$("ion-pane").css('pointer-events','none').css('background','rgba(0,0,0,0.0)');
                        } else {
                          //console.log('Expired!!!');

                          //writeToFile('sub.json', { subscribed: 'false', date: null });
                          var str = '{"subscribed": false, "date": null}';
                          ss.set(
                            function(key) {
                              /*console.log('Verify 3: Set ' + key);*/
                            },
                            function(error) {
                              /*console.log('Verify 3: Error ' + error);*/
                            },
                            ssk,
                            str
                          );

                          //$("#pano").hide();
                          $scope.loadProducts();
                          showIntroScreen();
                          $("#expiredTxt").show();

                          ss.remove(
                            function(key) {
                              /*console.log('Removed ' + key);*/
                            },
                            function(error) {
                              /*console.log('Error, ' + error);*/
                            },
                            ssk2
                          );

                          //$("ion-pane").css('pointer-events','all').css('background','rgba(0,0,0,0.8)');
                        }
                        //save to file and then validation from file
                      } else {
                        $ionicLoading.hide();
                        //console.log(' Please try again. If the problem persists, please contact our support.')
                        $ionicPopup.alert({
                          title: "There was an error with retrieving the data.",
                          template:
                            "Please try again. If the problem persists, contact our support."
                        });
                      }
                    }
                  })
                  .fail(function() {
                    $ionicLoading.hide();
                    //console.log("Posting fail.");
                    showIntroScreen();
                    $scope.loadProducts();
                    $ionicPopup.alert({
                      title: "Communication with the server failed",
                      template:
                        "Please try again. If the problem persists, contact our support."
                    });
                  });
              } else {
                $ionicLoading.hide();
                //console.log('IF you read this, its working');
                showIntroScreen();
                $scope.loadProducts();
              }
            } catch (err) {
              $ionicLoading.hide();
              //console.log('Catched error: ' + err.message);
              showIntroScreen();
              $scope.loadProducts();
            }
          },
          function(error) {
            $ionicLoading.hide();
            //console.log('Verify 1: Error ' + error);
            $scope.loadProducts();
            showIntroScreen();

            ss.get(
              function(value) {
                $("#expiredTxt").show();
              },
              function(error) {
                /*console.log('Error ' + error);*/
              },
              ssk
            );
          },
          ssk2
        );
        //            .catch(function (err) {
        //                console.log(err);
        //                $ionicLoading.hide();
        //            });
      }
    };

    $scope.restore = function() {
      $ionicLoading.show({ template: spinner + "Restoring subscription..." });

      var isOffline = "onLine" in navigator && !navigator.onLine;
      if (isOffline) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: "No internet connection",
          template: "Please check your internet connection and try again."
        });
      } else {
        inAppPurchase
          .getReceipt()
          .then(function(receipt) {
            //console.log(receipt);

            //writeToFileAndVerify('rc.json', { receipt: receipt});
            var str = '{"receipt": "' + receipt + '"}';
            ss.set(
              function(key) {
                /*console.log('Set ' + key);*/ $scope.verifyReceipt();
              },
              function(error) {
                /*console.log('Error ' + error);*/
              },
              ssk2,
              str
            );

            //$scope.verifyReceipt();
          })
          .catch(function(err) {
            //console.log(err);
            $ionicLoading.hide();
          });
      }
    };

    //orig restore function
    //    $scope.restore = function () {
    //        $ionicLoading.show({ template: spinner + 'Restoring Purchases...' });
    //        inAppPurchase
    //            .restorePurchases()
    //            .then(function (purchases) {
    //            $ionicLoading.hide();
    //            console.log(JSON.stringify(purchases));
    //            $ionicPopup.alert({
    //                title: 'Restore was successful!',
    //                template: 'Check your console log for the restored purchases data'
    //            });
    //        })
    //            .catch(function (err) {
    //            $ionicLoading.hide();
    //            console.log(err);
    //            $ionicPopup.alert({
    //                title: 'Something went wrong',
    //                template: 'Check your console log for the error details'
    //            });
    //        });
    //    };

    $scope.panoPreview = function(state) {
      if (state == "on") {
        $("previewButton").css("background-color", "#58B5F5");
        $("#introScreen").stop();
        $("#introScreen").animate({ opacity: 0.0 }, 500);
      } else if (state == "off") {
        $("previewButton").css("background-color", "#2EA3F2");
        $("#introScreen").stop();
        $("#introScreen").animate({ opacity: 1.0 }, 500);
      }
    };

    //    $scope.aboutButtonStatus = function(status){
    //        if(status=='active')
    //        {
    //            $(".aboutButton").addClass('active');
    //        }
    //        else
    //        {
    //            $(".aboutButton").removeClass('active');
    //        }
    //    }

    //    $ionicPopover.fromTemplateUrl('templates/popover.html', {
    //        scope: $scope,
    //    }).then(function(popover) {
    //        $scope.popover = popover;
    //    });

    //    $scope.$on('popover.hidden', function() {
    //        // Execute action
    //        $scope.aboutButtonStatus('disabled');
    //    });

    //
    //function showFaq() {
    //    $("#faqWrapper").fadeIn();
    //    $(".faqOverlay").fadeIn();
    //}
  });

//error handler
//var errorHandler = function (fileName, e) {
//    var msg = '';
//
//    switch (e.code) {
//        case FileError.QUOTA_EXCEEDED_ERR:
//            msg = 'Storage quota exceeded';
//            break;
//        case FileError.NOT_FOUND_ERR:
//            msg = 'File not found';
//            break;
//        case FileError.SECURITY_ERR:
//            msg = 'Security error';
//            break;
//        case FileError.INVALID_MODIFICATION_ERR:
//            msg = 'Invalid modification';
//            break;
//        case FileError.INVALID_STATE_ERR:
//            msg = 'Invalid state';
//            break;
//        default:
//            msg = 'Unknown error';
//            break;
//    };
//
//    //console.log('Error (' + fileName + '): ' + msg);
//}

var ss;
var ssk;
var ssk2;
var ssk3;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  ss = new cordova.plugins.SecureStorage(
    function() {
      /*console.log('SS Success')*/
    },
    function(error) {
      /*console.log('SS Error ' + error);*/
    },
    "my_app"
  );
  ssk = "5bs8jzoi15pbc74yl125hkvmbwhbph1za";
  ssk2 = "i9yvb7nqp6o74q6rzl34o32q35h2vzcyA";

  angular
    .element($("#ngcont"))
    .scope()
    .verifyReceipt();
  //    angular.element($('#ngcont')).scope().loadProducts();
  //    showIntroScreen();

  //
  //    var str = "receipt: 123456789";
  //
  //    ss.set(
  //        function (key) { console.log('12345: Set ' + key);},
  //        function (error) { console.log('12345: Set Error ' + error); },
  //        ssk, str);
  //
  //    ss.get(
  //        function (value) { console.log('12345: Get ' + value);
  //
  //                        var jsonData = eval('({' + value + '})');
  //                        for (datakey in jsonData) {
  //                            if(jsonData.hasOwnProperty(datakey)){
  //                                var receiptData = jsonData.receipt;
  //                            }
  //                        }
  //                        console.log('12345 Receipt from file: ' + receiptData);
  //                       },
  //        function (error) { console.log('12345: Error ' + error); },
  //        ssk);
}

function showIntroScreen() {
  $("#introScreen").show();
}

function hideIntroScreen() {
  $("#introScreen").fadeOut();
}

function checkExpiredOffline() {
  //check if file exists

  ss.get(
    function(value) {
      //console.log('1Success, got ' + value);
      //var testValue = '{"subscribed": true, "date": null}';  //HEEEEEEEEEEEEEEEEEEEEere
      var jsonData = JSON.parse(value);
      //console.log('Can you see this?');
      for (dataKey in jsonData) {
        if (jsonData.hasOwnProperty(dataKey)) {
          var subValue = jsonData.subscribed;
          var dateValue = jsonData.date;
        }
      }
      if (subValue != false) {
        var curTime = Math.floor(new Date().getTime());
        if (parseInt(dateValue) < curTime) {
          angular
            .element($("#ngcont"))
            .scope()
            .loadProducts();
          //console.log('Expired!!');

          //writeToFile('sub.json', { subscribed: 'false', date: null });
          var str = '{"subscribed": false, "date": null}';
          ss.set(
            function(key) {
              /*console.log('Set ' + key);*/
            },
            function(error) {
              /*console.log('Error ' + error);*/
            },
            ssk,
            str
          );

          showIntroScreen();
          $("#expiredTxt").show();
          //$("ion-pane").css('pointer-events','all').css('background','rgba(0,0,0,0.8)');
          //                    var x = document.getElementById('subscribed');
          //                    x.innerHTML = 'Subscribed: Expired Valid until: null';
        } else {
          hideIntroScreen();
          //$("ion-pane").css('pointer-events','none').css('background','rgba(0,0,0,0.0)');
          //                    var x = document.getElementById('subscribed');
          //                    x.innerHTML = 'Subscribed: ' + subValue + ' Valid until: ' + dateValue;
        }
      } else {
        //                var x = document.getElementById('subscribed');
        //                x.innerHTML = 'Subscribed: Expired Valid until: null';
        angular
          .element($("#ngcont"))
          .scope()
          .loadProducts();
        showIntroScreen();
        $("#expiredTxt").show();
      }
    },
    function(error) {
      //console.log('Error ' + error);
      angular
        .element($("#ngcont"))
        .scope()
        .loadProducts();
      showIntroScreen();
    },
    ssk
  );
}

function showFaq(status) {
  if (status == "show") {
    $("#faqWrapper").stop();
    $(".aboutButton").addClass("active");
    //            console.log('Show triggered');
    $("#faqWrapper").show();
    $("#faqWrapper").css("bottom", "-100%");

    $("#faqWrapper").animate(
      {
        bottom: "50%"
      },
      {
        duration: 500,
        specialEasing: {
          width: "linear",
          height: "easeOutBounce"
        }
      }
    );

    $(".faqOverlay").fadeIn();
  } else if (status == "hide") {
    //            console.log('Hide triggered');

    $("#faqWrapper").stop();
    $("#faqWrapper").animate(
      {
        bottom: "-100%"
      },
      {
        duration: 500,
        specialEasing: {
          width: "linear",
          height: "easeOutBounce"
        },
        complete: function() {
          $("#faqWrapper").hide();
        }
      }
    );

    $(".faqOverlay").fadeOut();
    $(".aboutButton").removeClass("active");
  }
}

//    $(".link1").on('click', function() {
//        alert("clicked");
//        //window.open('https://support.apple.com/en-us/HT202039', '_system');
//    });

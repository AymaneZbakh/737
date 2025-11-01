angular.module('starter.controllers', [])
//
//    .controller('DashCtrl', function($scope) {})
//
//    .controller('ChatsCtrl', function($scope, Chats) {
//    // With the new view caching in Ionic, Controllers are only called
//    // when they are recreated or on app start, instead of every page change.
//    // To listen for when this page is active (for example, to refresh data),
//    // listen for the $ionicView.enter event:
//    //
//    //$scope.$on('$ionicView.enter', function(e) {
//    //});
//
//    $scope.chats = Chats.all();
//    $scope.remove = function(chat) {
//        Chats.remove(chat);
//    };
//})
//
//    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//    $scope.chat = Chats.get($stateParams.chatId);
//})
.controller('FaqCtrl', function($rootScope, Faqs) {
//    $scope.$on('$ionicView.enter', function(e) {
//    });

    //$scope.faqs = Faqs.all();
                
  document.addEventListener('deviceready', function() {
        $rootScope.$apply(function() {
           cordova.getAppVersion.getVersionNumber().then(function (version) {
                $rootScope.appVersion = version;
           });

        });
    });
    
})
.controller('FaqChildCtrl', function($scope, $stateParams, Faqs) {
    //$scope.faq = Faqs.get($stateParams.faqId);

});
//    .controller('AccountCtrl', function($scope) {
//    $scope.settings = {
//        enableFriends: true
//    };
//});


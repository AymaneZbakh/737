angular.module('starter.services', [])

.factory('Faqs', function(){
//    var faqs = [{
//        id: 0,
//        name: 'How do subscriptions work?',
//        text: 'You pay every month, every 3 months or annual prices to have a full access to the trainer.'
//    },{
//        id: 1,
//        name: 'How do I upgrade my subscription?',
//        text: 'You can manage your subscription at any time through iTunes. For more information, tap <div id="test" class="link1">here</div>.'
//    },{
//        id: 2,
//        name: 'How do I unsubscribe?',
//        text: 'You can turn off the auto-renewing subscription at any time through iTunes. Tap <a href="#" onclick="window.open(\' https://support.apple.com/en-us/HT202039 \', \'_system \'>here</a> for a guide on how to manage and cancel your subscriptions. You will be unsubscribed after your current subscription period expires. Once your subscription expires, you will not be able to access the trainer anymore, unless you resubscribe.'
//    },{
//        id: 3,
//        name: 'When do subscription renew?',
//        text: 'Subscriptions are auto-renewed 24 hours before the end of the current period, unless auto-renew is turned off. Account will be charged for renewal within 24 hours prior to the end of the current period at the cost of the chosen subscription package.'
//    },{
//        id: 4,
//        name: 'What if I want to cancel my subscription before it expires?',
//        text: 'You cannot cancel an active subscription. To turn off the auto-renewing subscription, you can do so at any time through iTunes. Tap <a href="#" onclick="window.open(\' https://support.apple.com/en-us/HT202039 \', \'_system \'>here</a> for a guide on how to manage and cancel your subscriptions'
//    }];
//    
//    return {
//    all: function() {
//      return faqs;
//    },
//    get: function(faqId) {
//      for (var i = 0; i < faqs.length; i++) {
//        if (faqs[i].id === parseInt(faqId)) {
//          return faqs[i];
//        }
//      }
//      return null;
//    }
//  };

      return {
    appVersion : 'version'
};

});

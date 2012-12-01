javascript:(
function(){
if (!/\.salesforce\.com$/.test(location.hostname)) {
    alert('This bookmarklet is working on only *.salesforce.com domain.');
    return;
}

var sid = document.cookie.match(/(^|;\s*)sid=(.+?)(;|$)/)[2];
if (!sid) {
   alert('No sid cookie.');
   return;
}

function loadScript(url, callback) {
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;
   if (callback) {
     script.onload = callback;
     script.onreadystatechange = function() {
       if (script.readyState === 'loaded' || script.readyState === 'complete') {
         script.onreadystatechange = script.onload = null;
         callback();
       }
     };
   }
   document.body.appendChild(script);
}


var script = document.createElement('script');
loadScript('/soap/ajax/26.0/connection.js', function() {
  sforce.connection.sessionId = sid;
  sforce.connection.getUserInfo(function(userInfo) {
     var user = new sforce.SObject('User');
     user.Id = userInfo.userId;
     user.LanguageLocaleKey = /^ja/.test(userInfo.userLanguage) ? 'en_US' : 'ja';
     sforce.connection.update([ user ], function() {
        location.reload()
     });
  });
});

}
)();
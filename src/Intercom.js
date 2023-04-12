import { useEffect } from 'react';

const Intercom = () => {
  useEffect(() => {
    //Set your APP_ID
    var APP_ID = "dG9rOjQ1NjFiOTM4XzZmZThfNDkzYV84Y2QzX2ZlMDVhOTYxMmJmNzoxOjA=";

    window.intercomSettings = {
      app_id: APP_ID
    };
  
    if (window.Intercom) {
      window.Intercom('reattach_activator');
      window.Intercom('update', window.intercomSettings);
    } else {
      var d = document;
      var i = function() {
        i.c(arguments);
      };
      i.q = [];
      i.c = function(args) {
        i.q.push(args);
      };
      window.Intercom = i;
      var l = function() {
        var s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/' + APP_ID;
        var x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === 'complete') {
        l();
      } else if (window.attachEvent) {
        window.attachEvent('onload', l);
      } else {
        window.addEventListener('load', l, false);
      }
    }
  }, []);

  return null;
};

export default Intercom;

import { useEffect } from 'react';

const TrengoWidget = ({ apiKey }) => {
  useEffect(() => {
    window.Trengo = window.Trengo || {};
    window.Trengo.key = apiKey;
    (function(d, script, t) {
      script = d.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://static.widget.trengo.eu/embed.js';
      d.getElementsByTagName('head')[0].appendChild(script);
    })(document);
  }, [apiKey]);

  return null;
};

export default TrengoWidget;

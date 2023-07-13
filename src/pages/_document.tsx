import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
import { getDirection } from "@utils/get-direction";


export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    if (process.env.NODE_ENV !== "production") {
      i18n!.reloadResources(locale);
    }
    return (
      <Html dir={getDirection(locale)}>
        <Head>
        <meta property="og:title" content={"test"} />
      <meta property="og:description" content={'test_description'} />
      {/* <meta property="og:image" content={image} /> */}

          {/* <script>
            {`
              window.__lc = window.__lc || {};
              window.__lc.license =11326032;
              ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice)
            `}
          </script>
          <noscript>
            <a href="https://www.livechat.com/chat-with/11326032/" rel="nofollow">
              Chat with us
            </a>, powered by
            <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">
              LiveChat
            </a>
          </noscript> */}

          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
        window.fbAsyncInit = function() {
          FB.init({
            xfbml            : true,
            version          : 'v11.0'
          });
        };
    
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `,
            }}
          /> */}
          {/* <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6435189b31ebfa0fe7f79dd8/1gtnmg87v';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
            `
          }} /> */}
          {/* <script src="https://wchat.freshchat.com/js/widget.js"></script> */}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
                window.fcWidget.init({
                  token: "WEB_CHAT_TOKEN",
                  host: "https://wchat.freshchat.com",
                  siteId: "UNIQUE_SITE_ID"
                });
              `,
            }}
          />  */}
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-98478776-1"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-98478776-1');
              `,
            }}
          /> */}

          {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              {process.env.NODE_ENV === 'production' ? '(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic(\'reattach_activator\');ic(\'update\',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement(\'script\');s.type=\'text/javascript\';s.async=true;s.src=\'https://widget.intercom.io/widget/' + dG9rOjQ1NjFiOTM4XzZmZThfNDkzYV84Y2QzX2ZlMDVhOTYxMmJmNzoxOjA= + '\';var x=d.getElementsByTagName(\'script\')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent(\'onload\',l);}else{w.addEventListener(\'load\',l,false);}}})();' : ''
              `
          }}
        /> */}


        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              
!function() {
  var t = window.driftt = window.drift = window.driftt || [];
  if (!t.init) {
    if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
    t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
    t.factory = function(e) {
      return function() {
        var n = Array.prototype.slice.call(arguments);
        return n.unshift(e), t.push(n), t;
      };
    }, t.methods.forEach(function(e) {
      t[e] = t.factory(e);
    }), t.load = function(t) {
      var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
      o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
      var i = document.getElementsByTagName("script")[0];
      i.parentNode.insertBefore(o, i);
    };
  }
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('ybbifid8fiuv');
            `,
            }}
          /> */}
          {/* <script src="//code.tidio.co/zufckww0m60nk9yyb0c4pcu2yyycwqil.js" async></script> */}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:1626177,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          /> */}
          {/* <script
            type="text/javascript"
            async
            src="https://cdn.reamaze.com/assets/reamaze.js"
          /> */}
          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `_support = _support || { 'ui': {}, 'user': {} };
                _support['account'] = '{{ YOUR_BRAND_SUBDOMAIN }}';`
            }}
          /> */}
          {/* <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=YOUR_SNIPPET_KEY">
          </script>  */}




        </body>
      </Html>
    );
  }
}

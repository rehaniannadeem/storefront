const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
module.exports = withPWA({
  images: {
    //domains: ["pos-dev.myignite.online", "ignitepos.test"],
    domains: ["console.ignitehq.io", "ignitepos.test","ignitestorage.blob.core.windows.net","api.ignite.tech"],
  },
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
    runtimeCaching,
  },
  i18n,
 
  /*  distDir: "build", */
});

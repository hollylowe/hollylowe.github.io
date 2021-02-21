module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-layout/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"HollyAndEli.com","short_name":"HollyAndEli","start_url":"/","background_color":"#fff","theme_color":"#b59333","display":"minimal-ui","icon":"src/images/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"a9e602d3c4100d49d2d7eb453b4bc70f"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]

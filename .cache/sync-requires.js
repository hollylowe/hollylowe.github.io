const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/index.js"))),
  "component---src-pages-login-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/login.js"))),
  "component---src-pages-ourstory-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/ourstory.js"))),
  "component---src-pages-registry-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/registry.js"))),
  "component---src-pages-rsvp-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/rsvp.js"))),
  "component---src-pages-travel-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/travel.js"))),
  "component---src-pages-wedding-js": hot(preferDefault(require("/Users/hlowe/hollylowe.github.io/src/pages/wedding.js")))
}


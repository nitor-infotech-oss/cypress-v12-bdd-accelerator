const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default;

let data = {};

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    requestTimeout: 30000,
    waitForAnimations: true,
    videoCompression: false,
    includeShadowDom: true,
    // projectId: "", configure id for Cypress Cloud
    experimentalWebKitSupport : true,
    baseUrl: "https://reqres.in/",
    env: {
      dev: {
        "url": "devurl"
      },
      qa: {
        "url": "https://angular.realworld.io/"
      },
     
      runEnv: "qa",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber());

      on('task', {
        setProfile({ feature, profileType, profileVal }) {
          if (data.hasOwnProperty(feature) !== false) {
            data[feature][profileType] = profileVal
          } else {
            data[feature] = { [profileType]: profileVal }
          }
          return true
        },
        getProfile({ feature, profileType }) {
          return data[feature][[profileType]]
        },
        getAllProfile({ feature }) {
          if (data[feature]) {
            return data[feature]
          }
          else {
            return true
          }
        }
      });
    },
    specPattern: "cypress/e2e/**/*.feature"
  },
  component: {
    setupNodeEvents(on, config) {
      // component testing node events setup code
    },
  },
})
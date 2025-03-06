const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
    baseUrl: 'https://reacloud.duckdns.org', 
    },
  browsers: ['chrome']
  },  
});

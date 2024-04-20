const { defineConfig } = require("cypress");


const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

// const fs = require('fs');
// const xls = require("node-xls").default;
// const xlsx = require("node-xlsx").default;
const puppeteer = require('puppeteer');

const getChromeInfo = async () => {
  const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const versionString = await (browser.version());
  const version = versionString.split('/')[1];
  const majorVersion = version.split('.')[0];
  await browser.close();

  return {
    majorVersion,
    version,
    path: puppeteer.executablePath()
  }
};

   async function setupNodeEvents(on, config) {

  // const options = {
  //   ...browserify.defaultOptions,
  //   typescript: require.resolve('typescript'),
  // };

  const chromeInfo = await getChromeInfo();
  const path = require('path');
  const puppeteerChromium = {
    name: 'PuppeteerChromium',
    channel: 'stable',
    displayName: 'Chromium (Puppeteer)',
    family: 'chromium',
    path: chromeInfo.path,
    majorVersion: chromeInfo.majorVersion,
    version: chromeInfo.version
  };


  on('before:browser:launch', (browser = {}, launchOptions) => {
    const downloadDirectory = path.join(__dirname, '..', 'excelDownloads')
    if(browser.name === 'PuppeteerChromium') {
      launchOptions.args.push('--no-sandbox');
      launchOptions.args.push('--disable-setuid-sandbox');
      launchOptions.args.push('--disable-web-security');
      launchOptions.args.push('--auth-server-whitelist=*.facebook.com');
      launchOptions.args.push('--auth-negotiate-delegate-whitelist=*.facebook.com');
      launchOptions.preferences.default['download'] = {default_directory: downloadDirectory}
    }
    return launchOptions;
  });

  
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);
  


  // Make sure to return the config object as it might have been modified by the plugin.
  // return config;

  return {
    ...config,
    browsers: config.browsers.concat(puppeteerChromium)
    }
  }

   module.exports = defineConfig({
    e2e: {
      setupNodeEvents,
      specPattern: "cypress/e2e/features/*.feature",
      baseUrl: "https://www.saucedemo.com",
      chromeWebSecurity: false,
      env: {
        allureReuseAfterSpec: true,
      },
    },
  });


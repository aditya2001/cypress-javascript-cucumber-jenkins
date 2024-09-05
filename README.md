## cypress-cucumber-esbuild-jenkins
Cypress is a JavaScript based UI automation tool. This framework is created using Cypress with Cuucmber. Cypress integration with cucumber is possible using cypress-cucumber-preprocessor plugin. We are using cypress-esbuild-preprocessor is used to bundle specs using esbuild. This framework supports cross browser and parallel testing.

## Installing node on local windows.
1. Navigate to URL https://nodejs.org/en/download/prebuilt-installer, and download windows installer package.

![alt text](image.png)

## Test Execution - Command line
### When you want to run specific feature file on specific browser and specific env.
npx cypress run --browser chrome --spec cypress/e2e/features/* --config baseUrl="https://www.saucedemo.com"

### When you want to run scenarios in parallel- use below script
1. cypress:parallel:chrome
We are using package cypress-parallel for parallel execution of Scenarios.

## Test Execution via Jenkins
The Paramterized Jenkins job should look like below. The entire configuration is done in Jenkins file.
By default test will run with cross browser values as false. User can updated cross browser to true and test will run on all browsers.
#### Running test on single browser 
![alt text](image-1.png)

#### Running test on multiple browser
![alt text](image-3.png)

## HTML reports

![alt text](image-2.png)

Note- If you face issues viewing html report, type below in Manage Jenkins-->Script Console
#### command
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "sandbox allow-same-origin allow-scripts allow-popups allow-downloads; default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; media-src 'self'; font-src 'self'; frame-src 'self' data:;")

## Steps to clone the repo
1. Create repository online on git hub and do git clone locally using below command
2. git clone https://github.com/aditya2001/cypress-cucumber-esbuild-jenkins.git
3. Open VC code locally and do npm init to create package.json and added required folder structures
4. Do git init to convert to git repository, .git folder get created




import groovy.json.JsonOutput
pipeline {
    //The agent section specifies where the entire Pipeline, or a specific stage, 
    //will execute in the Jenkins environment depending on where the agent section is placed.
    agent any

    triggers {
        cron('TZ=America/New_York\n30 0 * * *')
    }

    options {
        timestamps()
        timeout(time: 20, unit: 'HOURS')
        ansiColor('xterm')
    }
    
    
    //The parameters directive provides a list of parameters that a user should provide when triggering the Pipeline.
    //The values for these user-specified parameters are made available to Pipeline steps via the params object, see
    //the Parameters, Declarative Pipeline for its specific usage.
    
    parameters {
        string(name: 'SPEC', defaultValue: 'cypress/e2e/features/*', description: 'Ej: cypress/e2e/features/*.feature')
        choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: 'Pick the web browser you want to use to run your scripts')
    }
    
    //The options directive allows configuring Pipeline-specific options from within the Pipeline itself.
    //Pipeline provides a number of these options, such as buildDiscarder, but they may also be provided by
    //plugins, such as timestamps. Ex: retry on failure


    //The stage directive goes in the stages section and should contain a steps section, an optional agent section, 
    //or other stage-specific directives. Practically speaking, all of the real work done by a Pipeline will be wrapped
    //in one or more stage directives.
    stages {
        stage('Building'){
           steps {
             echo "Building the application"
//               checkout scmGit(
//                     branches: [[name: "main"]],
//                     userRemoteConfigs: [[credentialsId: 'ssh-keys',
//                         url: 'git@github.com:aditya2001/cypress-cucumber-esbuild-jenkins.git']])
             }
          }
        
        stage('Testing') {
            environment {
                CYPRESS_CACHE_FOLDER = ".cache/cypress"
            }
            steps {
                // sh "npm i"
                // sh "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
                bat "npm i"
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        
        stage('Deploy'){
            steps {
                echo "Deploying"
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: "cypress/videos/*.mp4", onlyIfSuccessful: false
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFiles: 'cucumber-report.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}

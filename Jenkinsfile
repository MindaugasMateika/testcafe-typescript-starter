
node {
    TESTCAFE_DOCKER_PATH = 'docker/Dockerfile'
}


pipeline {
  agent { 
                 dockerfile {
                        filename "${TESTCAFE_DOCKER_PATH}"
                        args  '--net=host -e DISPLAY=":0"'
                         args '--entrypoint=\'\''
                        reuseNode true
                } 
  }
 environment {
  HOME = '.'
 }
 stages {
  stage('Clone scm') {
   steps {
    checkout([$class: 'GitSCM', branches: [
      [name: '*/master']
     ],
     userRemoteConfigs: [
      [url: 'https://github.com/abhinaba-ghosh/testcafe-typescript-starter.git']
     ]
    ])
   }
  }

   stage('Configuration') {
   steps {
     sh 'npm i --verbose'
     sh 'npm run clean' 
   }
  }

  stage('Run TestCafe') {
   steps {
    sh "npm run e2e:headless" 
    sh "npm run report" 
   }
  }

    stage('Publish Reports') {
        steps{
        publishHTML(
                target: [
                        allowMissing         : false,
                        alwaysLinkToLastBuild: false,
                        keepAll              : true,
                        reportDir            : './reports/allure/allure-report',
                        reportFiles          : 'index.html',
                        reportName           : "Allure Report"
                ]
        )
    }
    }

    stage("Publish NUnit Test Report") {
    steps {
    nunit testResultsPattern: 'TestResult.xml'
    }
    }

        post {
            always {
                junit 'build/reports/xml/report.xml'
            }
        }
 }
}



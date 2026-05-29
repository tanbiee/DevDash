pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        APP_DIR = 'vite-project'
        IMAGE_NAME = 'devdash:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git submodule update --init --recursive'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm ci'
                }
            }
        }

        stage('Lint') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run lint'
                }
            }
        }

        stage('Build') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir("${APP_DIR}") {
                    sh 'docker build -t ${IMAGE_NAME} .'
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'vite-project/dist/**', fingerprint: true
        }
    }
}

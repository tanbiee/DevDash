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
                script {
                    if (isUnix()) {
                        sh 'git submodule update --init --recursive'
                    } else {
                        bat 'git submodule update --init --recursive'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    script {
                        if (isUnix()) {
                            sh 'npm ci'
                        } else {
                            bat 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                dir("${APP_DIR}") {
                    script {
                        if (isUnix()) {
                            sh 'npm run lint'
                        } else {
                            bat 'npm run lint'
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                dir("${APP_DIR}") {
                    script {
                        if (isUnix()) {
                            sh 'npm run build'
                        } else {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir("${APP_DIR}") {
                    script {
                        if (isUnix()) {
                            sh 'docker build -t ${IMAGE_NAME} .'
                        } else {
                            bat "docker build -t %IMAGE_NAME% ."
                        }
                    }
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

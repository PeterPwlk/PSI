pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages {
        stage('Cloning repository') {
            steps {
                git 'https://github.com/PeterPwlk/PSI.git'
            }
        }
        stage('Dependencies') {
            steps {
                sh 'cd Backend/Persistance'
                sh 'npm install'
                sh 'cd ../web-api'
                sh 'npm install'
                sh 'cd ../../frontend'
                sh 'npm install'
            }
        }
    }
}
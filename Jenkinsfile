pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages {
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
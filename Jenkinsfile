pipeline {
    agent any
    
    tools {nodejs "node"}
    stages {
		stage('Debug') {
			steps {
				sh 'pwd'
			}
		}
        stage('Dependencies') {
            steps {
				dir('Backend/Persistance'){
					sh 'npm install'
				}
				dir('Backend/web-api'){
					sh 'npm install'
				}
				dir('frontend'){
					sh 'npm install'
				}
            }
        }
        stage('Build docker images'){
            steps{
                sh 'docker-compose down -v --remove-orphans'
                sh 'docker-compose up -d'
            }
        }
    }
}
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
        stage('Build') {
            steps {
				dir('Backend/web-api'){
					sh 'npm run build'
				}
				dir('frontend'){
					sh 'npm run build'
				}
            }
        }
    }
}
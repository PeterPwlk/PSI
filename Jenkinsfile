pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages {
		stage('Debug') {
			steps {
				sh 'pwd'
			}
		}
		stage('Backend'){
			steps {
				dir('Backend/Persistance'){
					sh 'npm install'
				}
				dir('Backend/web-api'){
					sh 'npm install'
				}
				dir('Backend/web-api'){
					sh 'npm run build'
				}
			}
		}
        stage('Frontend') {
            steps {
				dir('frontend'){
					sh 'npm install'
				}
            }
        }
    }
}
pipeline {
    agent any
    
    tools {nodejs "node"}
    environment {
       BACKEND_URL = http://51.83.129.128:3000
    }
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
//         stage('Build') {
//             steps {
// 				dir('Backend/web-api'){
// 					sh 'npm run build'
// 				}
// 				dir('frontend'){
// 					sh 'npm run build'
// 				}
//             }
//         }
//         stage('Tests') {
//                 parallel{
//                     stage('Frontend unit tests'){
//                         steps {
//                             dir('frontend'){
//                                 sh 'npm run test:unit'
//                             }
//                         }
//                     }
//                     stage('Backend unit test'){
//                         steps {
//                             dir('Backend/web-api'){
//                                 sh 'npm run test -- -t "ClassRoomService"'
//                             }
//                         }
//                     }
//                     stage('Backend integration tests'){
//                         steps {
//                             dir('Backend/web-api'){
//                                 sh 'npm run test:e2e'
//                             }
//                         }
//                     }
//                 }
//         }
        stage('Build docker images'){
            steps{
                sh 'docker-compose down -v --remove-orphans'
                sh 'docker-compose up -d'
            }
        }
    }
}
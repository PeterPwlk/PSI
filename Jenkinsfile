pipeline {
    agent any
    
    tools {nodejs "node"}
    stages {
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
                sh 'docker-compose down -v --remove-orphans --rmi "all"'
                sh 'docker-compose up -d --build --force-recreate'
            }
        }
    }
}
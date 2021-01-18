import {JsonFileReader} from "./jsonFileReader";
import {AwsDataImporter} from "./awsDataImporter";
import {CourseRepository} from "../Repositories/CourseRepository";
import * as AWS from "aws-sdk";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Tutor} from "../Models/tutor";
import {TutorRepository} from "../Repositories/tutorRepository";
import {ClassRoomRepository} from "../Repositories/classRoomRepository";

AWS.config.loadFromPath('./dynamoDbCredentials.json');
const docClient: DocumentClient = new AWS.DynamoDB.DocumentClient();

const paths = {
    tutors: "../../../Data/Prowadzacy.json",
    classRoom: "../../../Data/classroom.json",
    course: "../../../Data/Kurs.json"
};

const fileReader = new JsonFileReader();

// @ts-ignore
Promise.all([ImportAndCleanClassRooms(), ImportAndCleanCourses(), ImportAndCleanTutors()])
    .then(value => console.log(value));

async function ImportAndCleanTutors() {
    const tutorRepository = new TutorRepository(docClient);

    const awsImporter = new AwsDataImporter(tutorRepository, docClient);

    const importData = fileReader.readAndMap(paths.tutors);

    await awsImporter.cleanTable('Tutor', 'tutorId');
    await awsImporter.importData(importData);

    return "Tutors done";
}

async function ImportAndCleanCourses() {
    const courseRepository = new CourseRepository(docClient);

    const awsImporter = new AwsDataImporter(courseRepository, docClient);

    const importData = fileReader.readAndMap(paths.course);

    await awsImporter.cleanTable('Course', 'courseId');
    await awsImporter.importData(importData, CourseRepository.mapToLectureForm);

    return "Course done";
}

async function ImportAndCleanClassRooms() {
    const repository = new ClassRoomRepository(docClient);

    const awsImporter = new AwsDataImporter(repository, docClient);

    const importData = fileReader.readAndMap(paths.classRoom);

    await awsImporter.cleanTable('Course', 'courseId');
    await awsImporter.importData(importData);

    return "ClassRoom done";
}


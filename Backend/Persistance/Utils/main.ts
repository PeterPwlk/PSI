import {JsonFileReader} from "./jsonFileReader";
import {AwsDataImporter} from "./awsDataImporter";
import {CourseRepository} from "../Repositories/CourseRepository";
import * as AWS from "aws-sdk";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Tutor} from "../Models/tutor";
import {TutorRepository} from "../Repositories/tutorRepository";
import {ClassRoomRepository} from "../Repositories/classRoomRepository";
import {LectureRepository} from "../Repositories/lectureRepository";
import {LectureSchedulesRepository} from "../Repositories/lectureShedulesRepository";
import {FacultyRepository} from "../Repositories/facultyRepository";

AWS.config.loadFromPath('./dynamoDbCredentials.json');
const docClient: DocumentClient = new AWS.DynamoDB.DocumentClient();

const paths = {
    tutors: "../../../Data/Prowadzacy.json",
    classRoom: "../../../Data/Sala.json",
    course: "../../../Data/Kurs.json",
    lectures: "../../../Data/Zajecia.json",
    lecturesSchedules: "../../../Data/PlanZajec.json",
    faculty: "../../../Data/Kierunek.json"
};

const fileReader = new JsonFileReader();

// @ts-ignore
Promise.all([
    ImportAndCleanClassRooms(),
    ImportAndCleanCourses(),
    ImportAndCleanTutors(),
    ImportAndCleanLectures(),
    ImportAndCleanLectureSchedule(),
    ImportAndCleanFaculty()
    ])
    .then(value => console.log(value));

async function ImportAndCleanTutors() {
    const tutorRepository = new TutorRepository(docClient);

    const awsImporter = new AwsDataImporter(tutorRepository, docClient);

    const importData = fileReader.readAndMap(paths.tutors);

    const tableName = 'Tutor';
    await awsImporter.cleanTable(tableName, 'tutorId');
    await awsImporter.importData(importData, tableName);

    return "Tutors done";
}

async function ImportAndCleanCourses() {
    const courseRepository = new CourseRepository(docClient);

    const awsImporter = new AwsDataImporter(courseRepository, docClient);

    const importData = fileReader.readAndMap(paths.course);

    const tableName = 'Course';
    await awsImporter.cleanTable(tableName, 'courseId');
    await awsImporter.importData(importData, tableName, CourseRepository.mapToLectureForm);

    return "Course done";
}

async function ImportAndCleanClassRooms() {
    const repository = new ClassRoomRepository(docClient);

    const awsImporter = new AwsDataImporter(repository, docClient);

    const importData = fileReader.readAndMap(paths.classRoom);

    const tableName = 'ClassRoom';
    await awsImporter.cleanTable(tableName, 'classRoomId');
    await awsImporter.importData(importData, tableName);

    return "ClassRoom done";
}

async function ImportAndCleanLectures() {
    const repository = new LectureRepository(docClient);
    const awsImporter = new AwsDataImporter(repository, docClient);
    const importData = fileReader.readAndMap(paths.lectures);

    const tableName = 'Lecture';
    await awsImporter.cleanTable(tableName, 'lectureId');
    await awsImporter.importData(importData, tableName, LectureRepository.mapToLecture);

    return "Lectures done";
}

async function ImportAndCleanLectureSchedule() {
    const repository = new LectureSchedulesRepository(docClient);
    const awsImporter = new AwsDataImporter(repository, docClient);
    const importData = fileReader.readAndMap(paths.lecturesSchedules);

    const tableName = 'LectureSchedule';
    await awsImporter.cleanTable(tableName, 'lectureScheduleId');
    await awsImporter.importData(importData, tableName, LectureSchedulesRepository.mapToLectureSchedule);

    return "Lecture Schedule done";
}

async function ImportAndCleanFaculty() {
    const repository = new FacultyRepository(docClient);
    const awsImporter = new AwsDataImporter(repository, docClient);
    const importData = fileReader.readAndMap(paths.faculty);

    const tableName = 'Faculty';
    await awsImporter.cleanTable(tableName, 'facultyId');
    await awsImporter.importData(importData, tableName);

    return "Faculty done";
}


import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Tutor} from "../Models/tutor";
import {IRepositoryBase, RepositoryBase} from "./repositoryBase";

export class TutorRepository extends RepositoryBase<Tutor> implements IRepositoryBase<Tutor>{
    private static readonly TableName = 'Tutor';
    private static readonly TableKey = 'tutorId';

    constructor(docClient: DocumentClient) {
        super(docClient, TutorRepository.TableName, TutorRepository.TableKey)
    }

    async create(item: Tutor): Promise<Tutor> {
        return await super.createBase(item);
    }
    async getById(id: number): Promise<Tutor> {
        return (await super.getByIdBase(id))[0];
    }
    async getAll(): Promise<Tutor[]> {
        return await super.getAllBase();
    }

    async getAllBySuggestedCourseId(courseId: number): Promise<Tutor[]> {
        const query = {
            TableName: this.tableName,
            FilterExpression: "contains(suggestedLectures, :courseId) OR contains(courses, :courseId)",
            ExpressionAttributeValues: {
                ":courseId": courseId,
            }
        };
        let response;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items;
    }
}
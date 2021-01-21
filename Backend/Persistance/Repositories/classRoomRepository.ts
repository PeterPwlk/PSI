import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {ClassRoom} from "../Models/classRoom";
import {IRepositoryBase, RepositoryBase} from "./repositoryBase";

export class ClassRoomRepository extends RepositoryBase<ClassRoom> implements IRepositoryBase<ClassRoom> {
    private static readonly  TableName = "ClassRoom";
    private static readonly TableKey = "classRoomId";
    constructor(docClient: DocumentClient) {
        super(docClient, ClassRoomRepository.TableName, ClassRoomRepository.TableKey)
    }

    async create(item: ClassRoom): Promise<ClassRoom> {
        return await super.createBase(item);
    }
    async getById(id: number): Promise<ClassRoom> {
        return (await super.getByIdBase(id))[0];
    }
    async getAll(): Promise<ClassRoom[]> {
        return await super.getAllBase();
    }

    async getByClassRoomType(classRoomType: number): Promise<ClassRoom[]> {
        const query = {
            TableName : this.tableName,
            FilterExpression: "#classRoomType = :classRoomType",
            ExpressionAttributeNames: {
                "#classRoomType": "classRoomId"
            },
            ExpressionAttributeValues: {
                ":classRoomType": classRoomType
            }
        };
        let response;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items as ClassRoom[];
    }
}
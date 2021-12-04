import {connect, Model, connection} from 'mongoose';
import * as dotenv from 'dotenv';
import {FileTypesModel, IFileTypes} from "./schemas/file-types.schema";
import {ESchemaNames} from "./schemas/schemas.enum";
import {fileTypesDataset} from "./datasets/file-types.dataset";
import {rightsDataset} from "./datasets/rights.dataset";
import {IRights, RightsModel} from "./schemas/rights.schema";
import {usersDataset} from "./datasets/users.dataset";
import {IUsers, UserModel} from "./schemas/users.schema";
import {FilesModel, IFiles} from "./schemas/files.schema";
import {filesDataset} from "./datasets/files.dataset";
import {IUserRights, UserRightsModel} from "./schemas/user-rights.schema";
import {userRightsDataset} from "./datasets/user-rights.dataset";

dotenv.config();

const createManyOrLog = async <modelInterface>(
    collection: any[],
    model: Model<modelInterface, {}, {}, {}>,
    name: ESchemaNames): Promise<void> => {
    for (const document of collection) {
        try {
            await model.create(document);
        } catch (e) {
            console.log(`In collection ${name} document with _id "${document._id}" is already exist`);
        }
    }
}

(async () => {
    try {
        await connect(process.env.MONGO_URL);
        await createManyOrLog<IFileTypes>(fileTypesDataset, FileTypesModel, ESchemaNames.fileTypes);
        await createManyOrLog<IRights>(rightsDataset, RightsModel, ESchemaNames.rights);
        await createManyOrLog<IUsers>(usersDataset, UserModel, ESchemaNames.users);
        await createManyOrLog<IFiles>(filesDataset, FilesModel, ESchemaNames.files);
        await createManyOrLog<IUserRights>(userRightsDataset, UserRightsModel, ESchemaNames.userRights);
        await connection.close();
    } catch (e) {
        console.log('init disk error')
    }
})();

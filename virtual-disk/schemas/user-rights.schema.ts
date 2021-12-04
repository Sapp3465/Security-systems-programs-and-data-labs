import {model, Schema, Document, ObjectId} from 'mongoose';
import {ESchemaNames} from "./schemas.enum";

export interface IUserRights {
    file: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    right: Schema.Types.ObjectId;
}

export type TUserRights = IUserRights & Document;

export const UserRightsSchema = new Schema<IUserRights>({
    file: {type: Schema.Types.ObjectId, ref: ESchemaNames.files, required: true},
    user: {type: Schema.Types.ObjectId, ref: ESchemaNames.users, required: true},
    right: {type: Schema.Types.ObjectId, ref: ESchemaNames.rights, required: true},
});

export const UserRightsModel = model<IUserRights>(ESchemaNames.userRights, UserRightsSchema);

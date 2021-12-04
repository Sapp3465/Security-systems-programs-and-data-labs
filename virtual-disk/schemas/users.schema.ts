import {model, Schema, Document} from 'mongoose';
import {ESchemaNames} from "./schemas.enum";

export interface IUsers {
    name: string;
    password: string;
    time: number;
}

export type TUsers = IUsers & Document;

export const UsersSchema = new Schema<IUsers>({
    name: {type: String, required: true},
    password: {type: String, required: true},
    time: {type: Number, required: true},
});

export const UserModel = model<IUsers>(ESchemaNames.users, UsersSchema);

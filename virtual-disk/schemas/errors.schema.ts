import {model, Schema, Document} from 'mongoose';
import {ESchemaNames} from "./schemas.enum";

export interface IErrors {
    message: string;
    level: number;
    user: Schema.Types.ObjectId;
}

export type TErrors = IErrors & Document;

export const ErrorsSchema = new Schema<IErrors>({
    message: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: ESchemaNames.users, required: true},
    level: {type: Number, required: true},
});

export const ErrorsModel = model<IErrors>(ESchemaNames.errors, ErrorsSchema);

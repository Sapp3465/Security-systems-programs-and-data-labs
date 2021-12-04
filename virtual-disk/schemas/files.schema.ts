import {model, Schema, Document, ObjectId} from 'mongoose';
import {ESchemaNames} from "./schemas.enum";

export interface IFiles {
    name: string;
    type: Schema.Types.ObjectId;
    dirId?: Schema.Types.ObjectId;
    isEncrypted?: boolean;
    content?: string;
}

export type TFiles = IFiles & Document;

export const FilesSchema = new Schema<IFiles>({
    name: {type: String, required: true},
    type: {type: Schema.Types.ObjectId, ref: ESchemaNames.fileTypes, required: true},
    dirId: {type: Schema.Types.ObjectId, ref: ESchemaNames.files},
    isEncrypted: {type: Boolean},
    content: {type: String},
});

export const FilesModel = model<IFiles>(ESchemaNames.files, FilesSchema);

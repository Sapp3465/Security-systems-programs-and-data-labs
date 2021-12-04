import { model, Schema, Document } from 'mongoose';

export interface IFileTypes {
    label: string;
}

export type TFileTypes = IFileTypes & Document;

export const FileTypesSchema = new Schema<IFileTypes>({
    label: { type: String, required: true },
});

export const FileTypesModel = model<IFileTypes>('FileTypes', FileTypesSchema);

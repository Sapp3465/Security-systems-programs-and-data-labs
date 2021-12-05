import {model, Schema, Document} from 'mongoose';
import {ESchemaNames} from "./schemas.enum";

export interface IKeys {
    public: string;
    private: string;
    date: number;
}

export type TKeys = IKeys & Document;

export const KeysSchema = new Schema<IKeys>({
    public: {type: String, required: true},
    private: {type: String, required: true},
    date: {type: Number, required: true},
});

export const KeysModel = model<IKeys>(ESchemaNames.keys, KeysSchema);

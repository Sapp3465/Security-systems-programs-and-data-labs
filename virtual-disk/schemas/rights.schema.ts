import { model, Schema, Document } from 'mongoose';

export interface IRights {
    label: string;
}

export type TRights = IRights & Document;

export const RightsSchema = new Schema<IRights>({
    label: { type: String, required: true },
});

export const RightsModel = model<IRights>('Rights', RightsSchema);

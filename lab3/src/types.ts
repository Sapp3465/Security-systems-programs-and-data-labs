import {IUsers} from "../../virtual-disk/schemas/users.schema";
import {Types, Document} from "mongoose";

export type TCommandsCollection = {[key: string]: TCommand}

export type TUser =  Document<any, any, IUsers> & IUsers & {_id: Types.ObjectId}

export interface IState {
    user: TUser,
    currentDir: string,
    file?: string,
    content?: string,
}

export type TCommand = (state: IState, params: string[]) => Promise<void>;

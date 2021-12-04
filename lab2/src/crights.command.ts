import {TCommand} from "./types";
import {UserModel} from "../../virtual-disk/schemas/users.schema";
import {getLastFile} from "./createFile";
import {manyQuestions} from "./cli";
import {UserRightsModel} from "../../virtual-disk/schemas/user-rights.schema";

const ynToBool = (answer) => {
    if(answer === 'y' || answer === 'Y') return true;
    if (answer === 'n' || answer === 'N') return false;
    throw Error('Incorrect answer');
};

const existUserByLogin = async (login: string) => {
    const user = await UserModel.findOne({ name: login })
    return user;
};

export const crights: TCommand = async (state, params) => {
    if(state.user.name !== 'admin') throw new Error('Permission denied');
    if (params.length !== 1 ) throw new Error('Incorrect params length');
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) throw new Error('Unknown path');

    const { login, r, w, d } = await manyQuestions([
        { name: 'login', question: 'User login: ' },
        { name: 'r', question: 'Read (y|N): ' },
        { name: 'w', question: 'Write (y|N): ' },
        { name: 'd', question: 'Delete (y|N): ' },
    ]);
    const existUser = await existUserByLogin(login);
    if(!existUser) throw new Error('Unknown user');

    const read = ynToBool(r);
    const write = ynToBool(w);
    const del = ynToBool(d);

    if(read) await UserRightsModel.create({ file: lastFile._id, right: '61ab639fd168adb04fe4086d', user: existUser._id });
    if(write) await UserRightsModel.create({ file: lastFile._id, right: '61ab63a5be95b034f2ad29ad', user: existUser._id });
    if(del) await UserRightsModel.create({ file: lastFile._id, right: '61ab63ab9b2b94314e02958e', user: existUser._id });
}

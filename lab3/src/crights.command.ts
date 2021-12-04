import {TCommand} from "./types";
import {UserModel} from "../../virtual-disk/schemas/users.schema";
import {getLastFile} from "./createFile";
import {manyQuestions} from "./cli";
import {UserRightsModel} from "../../virtual-disk/schemas/user-rights.schema";
import {errors} from "./errorsHandler";

const ynToBool = async (answer, state) => {
    if(answer === 'y' || answer === 'Y') return true;
    if (answer === 'n' || answer === 'N') return false;
    await errors.IncorrectAnswer(state.user._id);
};

const existUserByLogin = async (login: string) => {
    const user = await UserModel.findOne({ name: login })
    return user;
};

export const crights: TCommand = async (state, params) => {
    if(state.user.name !== 'admin') await errors.PermissionDenied(state.user._id);
    if (params.length !== 1 ) await errors.IncorrectParamsLength(state.user._id);
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) await errors.UnknownPath(state.user._id);

    const { login, r, w, d } = await manyQuestions([
        { name: 'login', question: 'User login: ' },
        { name: 'r', question: 'Read (y|N): ' },
        { name: 'w', question: 'Write (y|N): ' },
        { name: 'd', question: 'Delete (y|N): ' },
    ]);
    const existUser = await existUserByLogin(login);
    if(!existUser) await errors.UnknownUser(state.user._id);

    const read = await ynToBool(r, state);
    const write = await ynToBool(w, state);
    const del = await ynToBool(d, state);

    if(read) await UserRightsModel.create({ file: lastFile._id, right: '61ab639fd168adb04fe4086d', user: existUser._id });
    if(write) await UserRightsModel.create({ file: lastFile._id, right: '61ab63a5be95b034f2ad29ad', user: existUser._id });
    if(del) await UserRightsModel.create({ file: lastFile._id, right: '61ab63ab9b2b94314e02958e', user: existUser._id });
}

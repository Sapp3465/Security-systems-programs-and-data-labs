import {TCommand} from "./types";
import {getLastFile} from "./createFile";
import {getRightForUser} from "./rights";
import {errors} from "./errorsHandler";

export const vi: TCommand = async (state, params) => {
    if (params.length !== 1) await errors.IncorrectParamsLength(state.user._id);
    const currentFile = await getLastFile(state.currentDir + params[0]);
    if (currentFile) {
        if (currentFile.type !== '61ab633a8c6d0c37455efb97') await errors.NotFile(state.user._id);
        const write = await getRightForUser(state, state.user._id, currentFile._id, 'write');
        if (!write) await errors.PermissionDenied(state.user._id);
        const read = await getRightForUser(state, state.user._id, currentFile._id, 'write');
        if (!read) await errors.PermissionDenied(state.user._id);
    }
    state.file = params[0];
    state.content = currentFile.content;
}

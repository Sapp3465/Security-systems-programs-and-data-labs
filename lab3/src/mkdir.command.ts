import {TCommand} from "./types";
import {createFile, getLastFile} from "./createFile";
import {getRightForUser} from "./rights";
import {errors} from "./errorsHandler";

export const mkdir: TCommand = async (state, params) => {
    if (params.length !== 1) await errors.IncorrectParamsLength(state.user._id);
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) await errors.UnknownPath(state.user._id);
    const writeRight = await getRightForUser(state, state.user._id, lastFile._id, 'write');
    if (!writeRight) await errors.PermissionDenied(state.user._id);
    await createFile(state.currentDir, params[0], state.user._id, 'directory');
}

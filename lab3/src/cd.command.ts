import {TCommand} from "./types";
import {getLastFile} from "./createFile";
import {getRightForUser} from "./rights";
import {errors} from "./errorsHandler";

export const cd: TCommand = async (state, params) => {
    if (params.length !== 1) await errors.IncorrectParamsLength(state.user._id)
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) await errors.UnknownPath(state.user._id)
    if (lastFile.type !== '61ab633112c3cee72dfbac70') await errors.NotDir(state.user._id)
    const readRight = await getRightForUser(state, state.user._id, lastFile._id, 'read');
    if (!readRight) await errors.PermissionDenied(state.user._id)
    state.currentDir += params[0] + '/';
}

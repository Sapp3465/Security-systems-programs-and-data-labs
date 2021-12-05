import {TCommand} from "./types";
import {getLastFile} from "./createFile";
import {getRightForUser} from "./rights";
import {deleteFile} from "./deleteFile";
import {errors} from "./errorsHandler";

export const rm: TCommand = async (state, params) => {
    if (params.length !== 1) await errors.IncorrectParamsLength(state.user._id);
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) await errors.UnknownPath(state.user._id);
    const deleteRight = await getRightForUser(state, state.user._id, lastFile._id, 'delete');
    if (!deleteRight) await errors.PermissionDenied(state.user._id);
    await deleteFile(lastFile._id);
}

import {TCommand} from "./types";
import {getLastFile} from "./createFile";
import {getRightForUser} from "./rights";
import {deleteFile} from "./deleteFile";

export const rm: TCommand = async (state, params) => {
    if (params.length !== 1) throw new Error('Incorrect params length');
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) throw new Error('Unknown path');
    const deleteRight = await getRightForUser(state.user._id, lastFile._id, 'delete');
    if (!deleteRight) throw new Error('Permission denied');
    await deleteFile(lastFile._id);
}

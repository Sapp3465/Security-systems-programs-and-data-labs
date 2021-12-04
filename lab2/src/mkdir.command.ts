import {TCommand} from "./types";
import {createFile, getLastFile} from "./createFile";
import {getRightForUser} from "./rights";

export const mkdir: TCommand = async (state, params) => {
    if (params.length !== 1) throw new Error('Incorrect params length');
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) throw new Error('Unknown path');
    const writeRight = await getRightForUser(state.user._id, lastFile._id, 'write');
    if (!writeRight) throw new Error('Permission denied');
    await createFile(state.currentDir, params[0], state.user._id, 'directory');
}

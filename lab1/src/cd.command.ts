import {TCommand} from "./types";
import {getLastFile} from "./createFile";
import {getRightForUser} from "./rights";

export const cd: TCommand = async (state, params) => {
    if (params.length !== 1) throw new Error('Incorrect params length');
    const lastFile = await getLastFile(state.currentDir + params[0]);
    if (!lastFile) throw new Error('Unknown path');
    if (lastFile.type !== '61ab633112c3cee72dfbac70') throw new Error('This is not a directory!');
    const readRight = await getRightForUser(state.user._id, lastFile._id, 'read');
    if (!readRight) throw new Error('Permission denied');
    state.currentDir += params[0] + '/';
}

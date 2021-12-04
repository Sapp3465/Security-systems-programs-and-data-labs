import {TCommand} from "./types";
import {getLastFile} from "./createFile";
import {getRightForUser} from "./rights";

export const vi: TCommand = async (state, params) => {
    if (params.length !== 1) throw new Error('Incorrect params length');
    const currentFile = await getLastFile(state.currentDir + params[0]);
    if (currentFile) {
        if (currentFile.type !== '61ab633a8c6d0c37455efb97') throw new Error('This is not a file!');
        const write = await getRightForUser(state.user._id, currentFile._id, 'write');
        if (!write) throw new Error('Permission denied');
        const read = await getRightForUser(state.user._id, currentFile._id, 'write');
        if (!read) throw new Error('Permission denied');
    }
    state.file = params[0];
    state.content = currentFile.content;
}

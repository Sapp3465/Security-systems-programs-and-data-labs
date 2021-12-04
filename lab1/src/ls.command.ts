import {TCommand} from "./types";
import {getAllFileChildren, getLastFile} from "./createFile";
import {getRightForUser} from "./rights";

export const ls: TCommand = async (state, params) => {
    if (params.length !== 0) throw new Error('Incorrect params length');
    const lastFile = await getLastFile(state.currentDir + params[0]);
    const readRight = await getRightForUser(state.user._id, lastFile._id, 'read');
    if (!readRight) throw new Error('Permission denied');
    const files = await getAllFileChildren(lastFile._id);
    for (const doc of files) {
        if (doc.type === '61ab633112c3cee72dfbac70') console.log('\x1b[33m%s\x1b[0m', doc.name);
        else console.log(doc.name);
    }
}

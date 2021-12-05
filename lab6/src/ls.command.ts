import {TCommand} from "./types";
import {getAllFileChildren, getLastFile} from "./createFile";
import {getRightForUser} from "./rights";
import {errors} from "./errorsHandler";

export const ls: TCommand = async (state, params) => {
    if (params.length !== 0) await errors.IncorrectParamsLength(state.user._id);
    const lastFile = await getLastFile(state.currentDir + params[0]);
    const readRight = await getRightForUser(state, state.user._id, lastFile._id, 'read');
    if (!readRight) await errors.PermissionDenied(state.user._id);
    const files = await getAllFileChildren(lastFile._id);
    for (const doc of files) {
        if (doc.type === '61ab633112c3cee72dfbac70') console.log('\x1b[33m%s\x1b[0m', doc.name);
        else console.log(doc.name);
    }
}

import {TCommand} from "./types";
import {getLastFile} from "./createFile";
import {getRightForUser} from "./rights";
import {errors} from "./errorsHandler";
import {KeysModel} from "../../virtual-disk/schemas/keys.schema";
import NodeRSA from 'encrypt-rsa';
const algorithm = new NodeRSA();

export const vi: TCommand = async (state, params) => {
    if (params.length !== 1) await errors.IncorrectParamsLength(state.user._id);
    const currentFile = await getLastFile(state.currentDir + params[0]);
    let content = '';
    if (currentFile) {
        if(currentFile.isEncrypted){
            const keys = await KeysModel.findOne().sort({ date: 1 });
            if(keys.date < Date.now()){
                const { privateKey, publicKey } = algorithm.createPrivateAndPublicKeys()
                await KeysModel.create({
                    public: publicKey,
                    private: privateKey,
                    date: Date.now(),
                });
            }
            content = algorithm.decryptStringWithRsaPrivateKey({
                text: currentFile.content,
                key: keys.private,
            });
        }
        if (currentFile.type !== '61ab633a8c6d0c37455efb97') await errors.NotFile(state.user._id);
        const write = await getRightForUser(state, state.user._id, currentFile._id, 'write');
        if (!write) await errors.PermissionDenied(state.user._id);
        const read = await getRightForUser(state, state.user._id, currentFile._id, 'write');
        if (!read) await errors.PermissionDenied(state.user._id);
    }
    state.file = params[0];
    state.content = content;
}

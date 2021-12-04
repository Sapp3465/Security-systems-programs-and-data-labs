import {UserRightsModel} from "../../virtual-disk/schemas/user-rights.schema";
import {rightsDataset} from "../../virtual-disk/datasets/rights.dataset";
import {usersDataset} from "../../virtual-disk/datasets/users.dataset";
import {FilesModel} from "../../virtual-disk/schemas/files.schema";
import {filesDataset} from "../../virtual-disk/datasets/files.dataset";
import {fileTypesDataset} from "../../virtual-disk/datasets/file-types.dataset";

export const addRight = async (fileId: string, userId: string, rightId: string) => {
    return await UserRightsModel.create({
        file: fileId,
        right: rightId,
        user: userId,
    });
}

export const addAllRights = async (fileId: string, userId: string) => {
    for (const right of rightsDataset) {
        await addRight(fileId, userId, right._id);
    }
}

export const getLastFile = async (path: string): Promise<any> => {
    const fileNames: string[] = path.split('/').filter(Boolean);
    let result: any = {_id: '61ab67b162d007c6860a0692'};
    for (const name of fileNames) {
        if (name) {
            result = await FilesModel.findById(result._id);
        }
    }
    return result;
}

export const getAllFileChildren = async (fileId: string): Promise<any[]> => {
    const result = await FilesModel.find({ dirId: fileId as any });
    return result;
}

export const getAdminId = () => usersDataset.find(({name}) => name === 'admin');
export const getTypeId = (label: string) => fileTypesDataset.find((doc) => doc.label === label);

export const createFile = async (
    currentDir: string,
    file = '',
    userId: string,
    type = 'directory',
    content: string = ''): Promise<void> => {

    const admin = getAdminId();
    const lastFile = await getLastFile(currentDir + file);
    const typeId = getTypeId(type);

    const newFile = await FilesModel.create({
        content: content || undefined,
        dirId: lastFile._id,
        name: file,
        type: typeId,
    });

    await addAllRights(newFile._id, admin._id);
    if (admin._id !== userId) await addAllRights(newFile._id, userId);
}

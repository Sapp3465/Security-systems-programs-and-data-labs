import {UserRightsModel} from "../../virtual-disk/schemas/user-rights.schema";
import {FilesModel} from "../../virtual-disk/schemas/files.schema";

export const deleteFile = async (fileId: string): Promise<void> => {
    await UserRightsModel.deleteMany({ file: fileId as any });
    await FilesModel.deleteOne({ _id: fileId });
}

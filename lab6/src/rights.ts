import {rightsDataset} from "../../virtual-disk/datasets/rights.dataset";
import {UserRightsModel} from "../../virtual-disk/schemas/user-rights.schema";
import {Types} from "mongoose";
import {errors} from "./errorsHandler";
import {IState} from "./types";

export const getRightByLabel = (label: string) => rightsDataset.find(right => right.label === label);

export const getRightForUser = async (state: IState, userId: string, fileId: string,  right: string) => {
    const rightObj = getRightByLabel(right);
    if(!rightObj) await errors.RightNotExist(state.user._id, right);
    const doc = await UserRightsModel.findOne({
        user: new Types.ObjectId(userId) as any,
        file: new Types.ObjectId(fileId) as any,
        right: new Types.ObjectId(rightObj._id) as any,
    });
    return doc;
}

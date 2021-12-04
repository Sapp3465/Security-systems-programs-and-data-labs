import {TCommand} from "./types";

export const pwd: TCommand = async (state, params) => {
    console.log(state.currentDir)
}

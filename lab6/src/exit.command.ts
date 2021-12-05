import {TCommand} from "./types";
import {connection} from "mongoose";

export const exit: TCommand = async (state, params) => {
    console.log(`Goodbye ${state.user.name}`);
    await connection.close();
    process.exit();
}

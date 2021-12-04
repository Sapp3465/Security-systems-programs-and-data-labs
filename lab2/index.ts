import {UserModel} from "../virtual-disk/schemas/users.schema";
import {terminal, passwordQuestion} from './src/cli';
import {connect, connection} from 'mongoose';
import * as dotenv from 'dotenv';
import {TUser} from "./src/types";

dotenv.config();


async function main() {
    await connect(process.env.MONGO_URL);
    const enteredPassword: string = await passwordQuestion();
    const user: TUser = await UserModel.findOne({password: enteredPassword});
    if (!user) {
        console.log('Incorrect password');
        await connection.close();
        process.exit();
    }
    try{
        await terminal({user, currentDir: '/'});
    }catch (e){
        console.log('\x1b[33m%s\x1b[0m', e.message);
    }
};

main();

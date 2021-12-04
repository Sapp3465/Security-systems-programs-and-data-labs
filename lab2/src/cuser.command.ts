import {TCommand} from "./types";
import {connection} from "mongoose";
import {manyQuestions} from "./cli";
import {UserModel} from "../../virtual-disk/schemas/users.schema";

export enum variant {
    loginTime = 5000 * 60,
    usersCount = 8,
    adminPasswordLength = 8,
    passwordLength = 6,
    attempts = 2,
    validUser = 1000 * 60 * 60 * 24 * 8,
}

export const cuser: TCommand = async (state, params) => {
    if(state.user.name !== 'admin') throw new Error('Permission denied');
    if (params.length !== 0 ) throw new Error('Incorrect params length');

    let done = false;
    const timerId = setTimeout(async () => {
        if(!done){
            console.log('\nLogin time is passed');
            await connection.close();
            process.exit();
        }
    }, variant.loginTime);

    const allUsers = await UserModel.find({});
    if(allUsers.length >= variant.usersCount) throw new Error('Excess number of new users');
    for (let i = 0; i < variant.attempts; i++) {
        const newUserInf = await manyQuestions([
            { name: 'login', question: 'New user login: ' },
            { name: 'password', secure: true },
            { name: 'repeatPassword', secure: true, question: 'Repeat password: ' },
        ]);
        if(newUserInf.password !== newUserInf.repeatPassword) {
            console.log('Password and repeated password not same');
            continue;
        }
        if(newUserInf.login === 'admin' && newUserInf.password.length < variant.adminPasswordLength){
            console.log('Password is too short');
            continue;
        }
        if(newUserInf.login !== 'admin' && newUserInf.password.length < variant.passwordLength){
            console.log('Password is too short');
            continue;
        }
        done = true;
        clearTimeout(timerId);
        await UserModel.create({
            name: newUserInf.login,
            password: newUserInf.password,
            time: Date.now(),
        });
        return;
    }
    clearTimeout(timerId);
    done = true;
    console.log('You have exceeded the login limit');
    process.exit();
}

import {TCommand} from "./types";
import {variant} from "./cuser.command";
import {connection} from "mongoose";
import {UserModel} from "../../virtual-disk/schemas/users.schema";
import {manyQuestions} from "./cli";

const verifyUserWithRules = async (attempts = variant.attempts, time = variant.loginTime) => {
    let done = false;
    const timerId = setTimeout(async () => {
        if(!done){
            console.log('\nLogin time is passed');
            await connection.close();
            process.exit();
        }
    }, time);
    for (let i = 0; i < attempts; i++) {
        const userData = await manyQuestions([
            { name: 'login', question: 'User login: '},
            { name: 'password', secure: true }
        ]);
        const selectedUser = await UserModel.findOne({ name: userData.login, password: userData.password });
        if (!selectedUser) console.log('Incorrect login or password');
        else if(selectedUser.time && Date.now() - selectedUser.time > variant.validUser) {
            console.log('This user\'s password has expired. Contact the administrator for help')
        }
        else {
            done = true
            if(selectedUser.time) {
                console.log('Your password is valid until ' + new Date(selectedUser.time + variant.validUser));
            }
            return selectedUser;
        }
    }
    clearTimeout(timerId);
    done = true;
    console.log('You have exceeded the login limit');
    process.exit();
}

export const su: TCommand = async (state, params) => {
    if (params.length !== 0 ) throw new Error('Incorrect params length');
    const userData = await verifyUserWithRules();
    state.user = userData;
    state.currentDir = '/';
}

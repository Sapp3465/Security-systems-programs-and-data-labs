import {ErrorsModel} from "../../virtual-disk/schemas/errors.schema";

export const newError = async (message: string, level: number, userId: string) => {
    await ErrorsModel.create({
        message,
        level,
        user: userId
    });
    console.log('\x1b[33m%s\x1b[0m', message);
}

export const errors = {
    IncorrectCommand: async (user, command) => await newError(`Incorrect command "${command}"`, 0, user),
    IncorrectParamsLength: async (user) => await newError('Incorrect params length', 0, user),
    UnknownPath: async (user) => await newError('Unknown path', 0, user),
    PermissionDenied: async (user) => await newError('Permission denied', 2, user),
    NotDir: async (user) => await newError('This is not a directory!', 3, user),
    IncorrectAnswer: async (user) => await newError('Incorrect answer', 1, user),
    UnknownUser: async (user) => await newError('Unknown user', 1, user),
    LoginTimePassed: async (user) => await newError('Login time is passed', 1, user),
    ExcessNumberOfUsers: async (user) => await newError('Excess number of new users', 0, user),
    PasswordNotSame: async (user) => await newError('Password and repeated password not same', 1, user),
    PasswordShort: async (user) => await newError('Password is too short', 1, user),
    ExceededLimit: async (user) => await newError('You have exceeded the login limit', 1, user),
    NotFile: async (user) => await newError('This is not a file!', 3, user),
    IncorrectLoginOrPassword: async (user) => await newError('Incorrect login or password', 1, user),
    ExpiredPassword: async (user) => await newError('This user\'s password has expired. Contact the administrator for help', 1, user),
    RightNotExist: async (user, right) => await newError(`Right "${right}" does not exist`, 0, user),
}

import * as readline from 'readline';
import {commands} from './commands';
import {createFile} from './createFile';
import {IState} from "./types";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

if (process.stdin.isTTY) process.stdin.setRawMode(true);

export const write = (content: string): void => rl.write(content);

export const line = (path: string): Promise<string> => new Promise(resolve => rl.question(path, resolve));

export const cursorToStart = (): void => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    rl.write('Password: ');
}

export const removeLastSymbol = (value: string): string => value.substring(0, value.length - 1);

export const passwordQuestion = (): Promise<string> => new Promise(resolve => {
    readline.emitKeypressEvents(process.stdin);

    let password: string = '';
    let done: boolean = false;
    cursorToStart()

    process.stdin.on('keypress', (chunk, key) => {
        if (done) return;
        if (key.name === 'return') {
            done = true;
            resolve(password);
        } else if (password && key.name === 'backspace') password = removeLastSymbol(password);
        else {
            cursorToStart()
            password += key.name;
        }
    });
})

export const badCommandHandler = async (command: string): Promise<void> => {
    console.log(`Bad command: "${command}"`);
}

export const saveFileHandler = async (state: IState, params: string[]): Promise<void> => {
    await createFile(state.currentDir, state.file, state.user._id, 'file', params[0]);
    delete state.file;
    delete state.content;
}

export const commandHandler = async (state: IState, params: string[], command: string): Promise<void> => {
    await commands[command](state, params);
    if (command === 'vi') write('\n' + state.content);
}

export const getPath = (state): string => state.file ? '' : `${state.currentDir}:$`;

export const terminal = async (state: IState): Promise<void> => {
    const path: string = getPath(state);
    const answer: string = await line(path);
    const [command, ...params] = answer.split(' ');

    if (!commands[command] && !state.file) await badCommandHandler(command);
    else if (state.file) await saveFileHandler(state, params);
    else await commandHandler(state, params, command);

    await terminal(state);
}

import {TCommandsCollection} from "./types";
import {exit} from "./exit.command";
import {cd} from "./cd.command";
import {vi} from "./vi.command";
import {ls} from "./ls.command";
import {rm} from "./rm.command";
import {pwd} from "./pwd.command";
import {mkdir} from "./mkdir.command";

export const commands: TCommandsCollection = {
    exit,
    cd,
    ls,
    mkdir,
    pwd,
    rm,
    vi,
}

"use strict";
exports.__esModule = true;
exports.commands = void 0;
var exit_command_1 = require("./exit.command");
var cd_command_1 = require("./cd.command");
var vi_command_1 = require("./vi.command");
var ls_command_1 = require("./ls.command");
var rm_command_1 = require("./rm.command");
var pwd_command_1 = require("./pwd.command");
var mkdir_command_1 = require("./mkdir.command");
exports.commands = {
    exit: exit_command_1.exit,
    cd: cd_command_1.cd,
    ls: ls_command_1.ls,
    mkdir: mkdir_command_1.mkdir,
    pwd: pwd_command_1.pwd,
    rm: rm_command_1.rm,
    vi: vi_command_1.vi
};

"use strict";

const { display } = require("./commands/display");
const { validateInput } = require("./commands/handleInput");
const { help } = require("./commands/help");

const input = process.argv.slice(2);

// list of inputs
const inputPaths = [];
const inputOptions = [];

// getting input data
const success = validateInput(input, inputPaths, inputOptions);

// if help option given
if (inputOptions.indexOf("-h") >= 0) {
    help();
    return;
}

// if no path given
if (success && inputPaths.length === 0) {
    console.log(`wcat: no filepath given\nTry 'wcat -h' for more information.`);
    return;
}

// if invalid input given
if (!success) return;

// display content
display(inputPaths, inputOptions);

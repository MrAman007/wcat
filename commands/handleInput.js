"use strict";

const options = {
    "-s": "single blank line",
    "-b": "number non empty line",
    "-n": "number all lines",
    "-h": "help",
};

function validateInput(input, inputPaths, inputOptions) {
    //handling input
    let flag = false; // flag to control edge case of -b and -n
    for (const i of input) {
        if (options.hasOwnProperty(i)) {
            if (!flag && (i === "-b" || i === "-n")) {
                flag = true;
                inputOptions.push(i);
            }
            if (flag && (i === "-b" || i === "-n")) {
                continue;
            } else {
                if (inputOptions.indexOf(i) < 0) inputOptions.push(i);
            }
        } else {
            if (i.charAt(0) === "-") {
                console.log(
                    `wcat: invalid option -- ${i}\nTry 'wcat -h' for more information.`
                );
                return false; //invalid input
            } else {
                inputPaths.push(i);
            }
        }
    }

    // getting -s at zero index
    if (inputOptions.length > 1) {
        if (inputOptions[1] === "-s") {
            inputOptions[1] = inputOptions[0];
            inputOptions[0] = "-s";
        }
    }

    return true; // valid input
}

module.exports = {
    validateInput,
};

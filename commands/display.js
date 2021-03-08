"use strict";

const fs = require("fs");
const path = require("path");

function display(inputPaths, inputOptions) {
    let output = "";
    let err = "";
    //loop through all values of inputPaths
    for (const filepath of inputPaths) {
        const absolutePath = path.resolve(filepath);
        if (fs.existsSync(absolutePath)) {
            // if path exists
            if (fs.lstatSync(absolutePath).isDirectory()) {
                // if path is directory update error string
                err += `wcat: ${filepath}: Is a directory\n`;
            } else {
                output += getData(absolutePath); // else update output string
            }
        } else {
            err += `wcat: ${filepath}: No such file or directory\n`; // if path does't exist, update error string
        }
    }

    // apply options to the output string
    for (const opt of inputOptions) {
        if (opt === "-s") {
            output = removeMultipleBlankLines(output);
        } else if (opt === "-b") {
            output = addLineNumberToNonEmptyLines(output);
        } else if (opt === "-n") {
            output = addLineNumber(output);
        }
    }

    // print output and error in console
    process.stdout.write(output);
    process.stderr.write(err);
}

function getData(filepath) {
    const data = fs.readFileSync(filepath);
    return data.toString();
}

function addLineNumberToNonEmptyLines(str) {
    let strArr = str.split("\n");
    let count = 1;
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] == "") {
            continue;
        } else {
            strArr[i] = "     " + count + "  " + strArr[i];
            count++;
        }
    }
    return strArr.join("\n");
}

function addLineNumber(str) {
    let strArr = str.split("\n");
    for (let i = 0; i < strArr.length; i++) {
        if (i === strArr.length - 1 && strArr[i] == "") {
            continue;
        } else {
            strArr[i] = "     " + (i + 1) + "  " + strArr[i];
        }
    }
    return strArr.join("\n");
}

// some bug fix needed
function removeMultipleBlankLines(str) {
    // str = str.replace(/\n\s*\n\s*/, "\n\n");
    let result = "";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        result += str[i];
        if (str[i] == "\n") count++;

        if (count > 2) {
            while (i < str.length && str[i] == "\n") i++;
            i--;
            count = 0;
        }
    }
    return result;
}

module.exports = {
    display,
};

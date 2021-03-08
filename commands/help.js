"use strict";

function help() {
    console.log(`Usage: wcat [OPTION]... [FILE]...
    Concatenate FILE(s) to standard output.
    
      -b,       number nonempty output lines
      -n,       number all output lines
      -s,       suppress repeated empty output lines
    `);
}

module.exports = {
    help,
};

// src/common/strings.js

const toInt = (a) => parseInt(a, 10);

const escapeRegExp = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

const globally = (b) => new RegExp(escapeRegExp(b), "g");

const removeChars = (chars) => (string) => {
    const charsArray = chars.split("");
    return charsArray.reduce((a, b) => a.replace(globally(b), ""), string);
};

const replaceAll = (char) => (string) => string.replace(globally(char), ",");

const getStringFrom = (char) => (string) => string.substr(string.indexOf(char) + 1);

const getStringBetween = (initialString, endString) => (string) => string.substr(initialString.length, string.indexOf(endString) - initialString.length);

const splitByAny = (delimiters) => (string) => {
    const getRegExp = (delimiters) => new RegExp("[" + delimiters.join("|") + "]");
    return string.split(getRegExp(delimiters));
};

export { toInt, removeChars, getStringFrom, splitByAny, replaceAll, getStringBetween };

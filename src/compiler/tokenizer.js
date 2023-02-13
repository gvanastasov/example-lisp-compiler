"use strict";

const TOKENS = require("./tokens");

/**
 * Reads a raw string data and generates tokens from it.
 *
 * @param {String} input a valid LISP statement.
 *
 * @example
 *
 *      IN:
 *          (add 2 (subtract 10 4))
 *
 *      OUT:
 *          [{ type: 'parenthesis', value: '(' }, ...]
 */
function tokenizer(input) {
  let cursor = 0;
  let tokens = [];

  while (cursor < input.length) {
    let char = input[cursor];

    // token: (
    if (char === TOKENS.PARENTHESIS_OPEN.VALUE) {
      tokens.push({
        type: TOKENS.PARENTHESIS_OPEN.TYPE,
        value: TOKENS.PARENTHESIS_OPEN.VALUE,
      });
      cursor++;
      continue;
    }

    // token: )
    if (char === TOKENS.PARENTHESIS_CLOSE.VALUE) {
      tokens.push({
        type: TOKENS.PARENTHESIS_CLOSE.TYPE,
        value: TOKENS.PARENTHESIS_CLOSE.VALUE,
      });
      cursor++;
      continue;
    }

    // token: \s
    if (TOKENS.WHITESPACE.REGEX.test(char)) {
      cursor++;
      continue;
    }

    // token: [0-9]
    if (TOKENS.NUMBER.REGEX.test(char)) {
      let value = "";

      do {
        value += char;
        char = input[++cursor];
      } while (TOKENS.NUMBER.REGEX.test(char));

      tokens.push({
        type: TOKENS.NUMBER.TYPE,
        value,
      });
      continue;
    }

    // token: [a-z]
    if (TOKENS.OPERATION.REGEX.test(char)) {
      let value = "";

      do {
        value += char;
        char = input[++cursor];
      } while (TOKENS.OPERATION.REGEX.test(char));

      tokens.push({
        type: TOKENS.OPERATION.TYPE,
        value,
      });
      continue;
    }

    throw new TypeError(`Unknown token "${char}" found at index {cursor}.`);
  }

  return tokens;
}

module.exports = tokenizer;

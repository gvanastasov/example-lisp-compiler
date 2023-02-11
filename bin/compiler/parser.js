'use strict';

const TOKENS = require('./tokens')
const NODE_TYPES = require('./nodes')

/**
 * Generates ast (Abstract Syntax Tree) from tokens.
 * 
 * @description ast is simply a deeply nested (tree) object that represents
 * code structure, that encapsulates variable types, values, order of execution 
 * statements, operations, etc.
 
 * @param {Array} tokens tokenized input
 * 
 * @example
 * 
 *      IN:
 *          [{ type: 'parenthesis', value: '(' }, ...]
 *      
 *      OUT:
 *          {
 *              type: 'Program',
 *              body: [{
 *                  type: 'CallExpression',
 *                  name: 'add',
 *                  params: [{
 *                      type: 'NumberLiteral',
 *                      value: '2',
 *                  },
 *                  ...
 *              ]
 *          }
 */
function parser(tokens) {
    let cursor = 0;

    function walk() {
        let token = tokens[cursor];

        // ast: NumberLiteral
        if (token.type === TOKENS.NUMBER.TYPE) {
            const node = {
                type: NODE_TYPES.NUMBER_LITERAL,
                value: token.value
            }
            cursor++;
            return node;
        }

        // ast: CallExpression
        if (token.type === TOKENS.PARENTHESIS_OPEN.TYPE) {
            token = tokens[++cursor];

            const node = {
                type: NODE_TYPES.CALL_EXPRESSION,
                name: token.value,
                params: []
            };

            cursor++;

            while (
                token.type !== TOKENS.PARENTHESIS_CLOSE.TYPE
            ) {
                node.params.push(walk());
                token = tokens[cursor];
            }

            cursor++;

            return node;
        }

        // todo: improve error message
        throw new TypeError(token.type);
    }

    let ast = {
        type: NODE_TYPES.PROGRAM,
        body: []
    };

    while (cursor < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}

module.exports = parser;

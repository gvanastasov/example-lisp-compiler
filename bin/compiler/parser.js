'use strict';

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

}
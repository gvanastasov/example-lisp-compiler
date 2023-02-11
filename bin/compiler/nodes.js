/**
 * 
 * @description LISP language's formal grammar as a specification:
 * 
 *      program         => expression*
 *      expression      => call (other?) | literal
 *      call            => "(" expression expression* ")"
 *      literal         => number (other?)
 * 
 */
const NODE_TYPES = {
    PROGRAM: 'Program',
    NUMBER_LITERAL: 'NumberLiteral',
    CALL_EXPRESSION: 'CallExpression',
}

module.exports = NODE_TYPES;

/**
 *
 * @description Common LISP language's formal grammar as a specification:
 *
 *      program         => expression*
 *      expression      => call | literal
 *      call            => "(" expression expression* ")"
 *      literal         => number
 *
 */
const CL_AST_NODE_TYPES = {
  PROGRAM: "Program",
  NUMBER_LITERAL: "NumberLiteral",
  CALL_EXPRESSION: "CallExpression",
};

/**
 * 
 * @description Javascript langauge's formal grammar as a specification.
 * 
 */
const JS_AST_NODE_TYPES = {
  PROGRAM: "Program",
  NUMBER_LITERAL: "NumberLiteral",
  CALL_EXPRESSION: "CallExpression",
  EXPRESSION_STATEMENT: "ExpressionStatement",
  IDENTIFIER: "Identifier",
}

module.exports = { CL_AST_NODE_TYPES, JS_AST_NODE_TYPES };

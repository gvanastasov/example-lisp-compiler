const { JS_AST_NODE_TYPES } = require('./nodes')

function generator(node) {
  switch (node.type) {
    case JS_AST_NODE_TYPES.PROGRAM:
      return node.body.map(generator).join("\n");

    case JS_AST_NODE_TYPES.EXPRESSION_STATEMENT:
      return generator(node.expression) + ";";

    case JS_AST_NODE_TYPES.CALL_EXPRESSION:
      return (
        generator(node.callee) +
        "(" +
        node.arguments.map(generator).join(", ") +
        ")"
      );

    case JS_AST_NODE_TYPES.IDENTIFIER:
      return node.name;

    case JS_AST_NODE_TYPES.NUMBER_LITERAL:
      return node.value;

    default:
      throw new TypeError(node.type);
  }
}

module.exports = generator;

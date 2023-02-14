const { CL_AST_NODE_TYPES } = require("./nodes");

// visitor pattern
function traverser(ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node, parent) {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case CL_AST_NODE_TYPES.PROGRAM:
        traverseArray(node.body, node);
        break;

      case CL_AST_NODE_TYPES.CALL_EXPRESSION:
        traverseArray(node.params, node);
        break;

      case CL_AST_NODE_TYPES.NUMBER_LITERAL:
        break;

      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}

module.exports = traverser;

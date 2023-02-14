const traverser = require("./traverser");
const { 
  CL_AST_NODE_TYPES,
  JS_AST_NODE_TYPES 
} = require("./nodes");

/**
 * Transformer
 *
 * @description transform ast
 * @param {Object} ast
 */
function transformer(ast) {
  let newAst = {
    type: JS_AST_NODE_TYPES.PROGRAM,
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {
    [CL_AST_NODE_TYPES.NUMBER_LITERAL]: {
      enter(node, parent) {
        parent._context.push({
          type: JS_AST_NODE_TYPES.NUMBER_LITERAL,
          value: node.value,
        });
      },
    },

    [CL_AST_NODE_TYPES.CALL_EXPRESSION]: {
      enter(node, parent) {
        let expression = {
          type: JS_AST_NODE_TYPES.CALL_EXPRESSION,
          callee: {
            type: JS_AST_NODE_TYPES.IDENTIFIER,
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;

        if (parent.type !== JS_AST_NODE_TYPES.CALL_EXPRESSION) {
          expression = {
            type: JS_AST_NODE_TYPES.EXPRESSION_STATEMENT,
            expression: expression,
          };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
}

module.exports = transformer;

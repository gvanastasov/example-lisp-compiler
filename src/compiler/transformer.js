const traverser = require('./traverser')
const NODE_TYPES = require('./nodes')

/**
 * Transformer
 * 
 * @description transform ast
 * @param {Object} ast 
 */
function transformer(ast) {
    let newAst = {
        type: NODE_TYPES.PROGRAM,
        body: []
    };

    ast._context = newAst.body;

    traverser(ast, {
        [NODE_TYPES.NUMBER_LITERAL]: {
            enter(node, parent) {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            }
        },

        CallExpression: {
            enter(node, parent) {
      
              let expression = {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: node.name,
                },
                arguments: [],
              };
      
              node._context = expression.arguments;
      
              if (parent.type !== 'CallExpression') {
                expression = {
                  type: 'ExpressionStatement',
                  expression: expression,
                };
              }
      
              parent._context.push(expression);
            },
        }
    })

    return newAst;
}

module.exports = transformer
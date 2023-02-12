const NODE_TYPES = require('../../bin/compiler/nodes')
const traverser = require('../../bin/compiler/traverser')

test('traverser applies visitor patter', () => {
    // assign
    const ast = {
        type: NODE_TYPES.PROGRAM,
        body: [
            {
                type: NODE_TYPES.CALL_EXPRESSION,
                name: 'add',
                params: [
                    {
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: "2"
                    },
                    {
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: "1"
                    }
                ]
            }
        ]
    };
    
    const visitor = {
        [NODE_TYPES.CALL_EXPRESSION]: {
            enter(node, _parent) { node.visited = true },
        },
        [NODE_TYPES.NUMBER_LITERAL]: {
            enter(node, _parent) { node.visited = true },
        }
    };

    // act
    traverser(ast, visitor);

    // assert
    expect(ast.body[0]).toHaveProperty('visited')
    expect(ast.body[0].params[0]).toHaveProperty('visited')
    expect(ast.body[0].params[1]).toHaveProperty('visited')
})
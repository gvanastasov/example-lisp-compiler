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
    
    const callExpressionEnterMock = jest.fn()
    const numberLiteralEnterMock = jest.fn()

    const visitor = {
        [NODE_TYPES.CALL_EXPRESSION]: {
            enter: callExpressionEnterMock,
        },
        [NODE_TYPES.NUMBER_LITERAL]: {
            enter: numberLiteralEnterMock,
        }
    };

    // act
    traverser(ast, visitor);

    // assert
    expect(callExpressionEnterMock).toHaveBeenCalledTimes(1)
    expect(numberLiteralEnterMock).toHaveBeenCalledTimes(2)
})
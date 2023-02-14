const { CL_AST_NODE_TYPES } = require("../../src/compiler/nodes");
const traverser = require("../../src/compiler/traverser");

test("traverser applies visitor patter", () => {
  // assign
  const ast = {
    type: CL_AST_NODE_TYPES.PROGRAM,
    body: [
      {
        type: CL_AST_NODE_TYPES.CALL_EXPRESSION,
        name: "add",
        params: [
          {
            type: CL_AST_NODE_TYPES.NUMBER_LITERAL,
            value: "2",
          },
          {
            type: CL_AST_NODE_TYPES.NUMBER_LITERAL,
            value: "1",
          },
        ],
      },
    ],
  };

  const callExpressionEnterMock = jest.fn();
  const numberLiteralEnterMock = jest.fn();

  const visitor = {
    [CL_AST_NODE_TYPES.CALL_EXPRESSION]: {
      enter: callExpressionEnterMock,
    },
    [CL_AST_NODE_TYPES.NUMBER_LITERAL]: {
      enter: numberLiteralEnterMock,
    },
  };

  // act
  traverser(ast, visitor);

  // assert
  expect(callExpressionEnterMock).toHaveBeenCalledTimes(1);
  expect(numberLiteralEnterMock).toHaveBeenCalledTimes(2);
});

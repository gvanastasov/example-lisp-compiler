const parser = require("../../src/compiler/parser");
const TOKENS = require("../../src/compiler/tokens");
const { CL_AST_NODE_TYPES } = require("../../src/compiler/nodes");

test("parsing tokens results in valid LISP ast", () => {
  // assign
  const tokens = [
    { type: TOKENS.PARENTHESIS_OPEN.TYPE, value: "(" },
    { type: TOKENS.OPERATION.TYPE, value: "add" },
    { type: TOKENS.NUMBER.TYPE, value: "2" },
    { type: TOKENS.NUMBER.TYPE, value: "1" },
    { type: TOKENS.PARENTHESIS_CLOSE.TYPE, value: ")" },
  ];

  // act
  const ast = parser(tokens);

  // assert
  expect(ast).toEqual({
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
  });
});

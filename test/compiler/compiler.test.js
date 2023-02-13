const compiler = require("../../src/index");

test("compiler works", () => {
  // assign
  const lispExpression = "(add 2 (subtract 3 1))";

  // act
  const result = compiler(lispExpression);

  // assert
  expect(result).toBe("add(2, subtract(3, 1));");
});

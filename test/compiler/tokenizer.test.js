const { TOKENS, tokenizer } = require('../../bin/compiler/tokenizer')

test('generating tokens from raw string data', () => {
    // assign
    const lispExpression = '(add 2 (subtract 3 1))';

    // act
    const tokens = tokenizer(lispExpression);

    // assert
    expect(tokens).toEqual([
        { type: TOKENS.PARENTHESIS_OPEN.TYPE, value: '(' },
        { type: TOKENS.OPERATION.TYPE, value: 'add' },
        { type: TOKENS.NUMBER.TYPE, value: '2' },
        { type: TOKENS.PARENTHESIS_OPEN.TYPE, value: '(' },
        { type: TOKENS.OPERATION.TYPE, value: 'subtract' },
        { type: TOKENS.NUMBER.TYPE, value: '3' },
        { type: TOKENS.NUMBER.TYPE, value: '1' },
        { type: TOKENS.PARENTHESIS_CLOSE.TYPE, value: ')' },
        { type: TOKENS.PARENTHESIS_CLOSE.TYPE, value: ')' },
    ]);
});

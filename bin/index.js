const tokenizer = require('./compiler/tokenizer')
const parser = require('./compiler/parser')
const transformer = require('./compiler/transformer')
const generator = require('./compiler/generator')

function compiler(input) {
    let tokens = tokenizer(input);
    let ast    = parser(tokens);
    let newAst = transformer(ast);
    let output = generator(newAst);

    return output;
}

module.exports = compiler
const program = require('commander');
const repl = require('repl');
const compiler = require('../src/index');
const fs = require("fs");
const path = require('path');

program
  .version('1.0.0')
  .option('-r, --run-time', 'Use runtime compiler.')
  .option('-g, --generate [path]', 'Use compiler on specific [path] location.')
  .parse(process.argv)

const options = program.opts();

if (options.runTime) {
    repl.start({
        prompt: 'lisp> ',
        eval: (input, _context, _filename, callback) => {
            callback(null, compiler(input));
        }
    })
}

if (options.generate) {
    const src = path.resolve(options.generate)
    let dest = path.join(path.resolve(src, '..'), '__generated')
    
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    try {
        if (fs.existsSync(src)) {
            const text = fs.readFileSync(src, { encoding:'utf8' });
            const compiled = compiler(text);
            const file = path.parse(src)

            fs.writeFile(path.join(dest, `${file.name}.g.js`), compiled, err => {
                if (err) {
                  console.error(err);
                }
            });
        }
    } catch (err) {
        console.error(`File not found at ${options.generate}.`)
    }
}
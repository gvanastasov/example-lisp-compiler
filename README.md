# **Example Common LISP compiler**

A simple example on a both runtime (and sdk) for compiling Common LISP to Javascript. Bear in mind this is jsut an example, therefore functionality is limited to only mark the basic architecture of a standard compiler solution.

## Architecture

1. Parsing
    - Lexical Analysis - generate tokens from raw input
    - Syntactic Analysis - parse tokens and generate Abstract Syntax Tree (AST for short)
2. Transforming - changing from one AST to another one (aka change language)
3. Generator - code generation from the newly formed AST

More information on the implementation can be found inside individual phases of the compiler code docs.

## Getting Started

Install dependencies
```sh
npm install
```

Runtime
```sh
# this will open a PERL shell where you can compile input at run time.
node . --run-time
```

SDK
```sh
# specify path to input for the compiler. Output will be written to subdir /__generated/ relateve to input path.
node . --generate ./path/to.cl
```
'use strict';

const TOKENS = {
    PARENTHESIS_OPEN: {
        TYPE: 'parenthesis',
        VALUE: '('
    },
    PARENTHESIS_CLOSE: {
        TYPE: 'parenthesis',
        VALUE: ')'
    },
    WHITESPACE: {
        REGEX: /\s/
    },
    NUMBER: {
        TYPE: 'number',
        REGEX: /[0-9]/
    },
    OPERATION: {
        TYPE: 'operation',
        REGEX: /[a-z]/i
    }
};

module.exports = TOKENS;

// Monarch syntax highlighting for the my-robot language.
export default {
    keywords: [
        'AND','Backward','Clock','ClockLeft','Forward','Left','NOT','OR','Right','boolean','cm','else','getDistance()','getSpeed()','getTimestamp()','if','in','let','loop','m','mm','number','setSpeed','then','var','void'
    ],
    operators: [
        '*','+',',','-','/','<','<=','=','==','>','>='
    ],
    symbols: /\(|\)|\*|\+|,|-|\/|<|<=|=|==|>|>=|\{|\}/,

    tokenizer: {
        initial: [
            { regex: /(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"string"} }} },
            { regex: /[0-9]+/, action: {"token":"number"} },
            { regex: /(("((\\([\s\S]))|((?!(\\|"))[\s\S]*?))*")|('((\\([\s\S]))|((?!(\\|'))[\s\S]*?))*'))/, action: {"token":"string"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /\s+/, action: {"token":"white"} },
            { regex: /\/\*/, action: {"token":"comment","next":"@comment"} },
            { regex: /\/\/[^\n\r]*/, action: {"token":"comment"} },
            { regex: /([\s\S])/, action: {"token":"white"} },
        ],
        comment: [
            { regex: /[^/\*]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[/\*]/, action: {"token":"comment"} },
        ],
    }
};

// Monarch syntax highlighting for the my-robot language.
export default {
    keywords: [
        'Add','AddSubExpression','Backward','BooleanExpression','CallEntity','CallFunction','CallFunctionExpr','Clock','ClockLeft','Divise','EqualTo','Fonction','Forward','GetSensor','If','Left','Loop','LowerThan','MultiDivExpression','Multiply','Parameter','Program','ReturnType','Right','SetSpeed','Sub','UpperThan','Value','VariableAssignation','VariableStatement','angle','arguments','arithmeticexpression','body','boolean','cm','condition','distance','else','entity','expression','function','leftCondition','leftOperand','m','mm','name','number','operator','parameter','returntype','rightCondition','rightOperand','then','type','unit','value','variable'
    ],
    operators: [
        ','
    ],
    symbols: /,|\{|\}/,

    tokenizer: {
        initial: [
            { regex: /(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"string"} }} },
            { regex: /[0-9]+/, action: {"token":"number"} },
            { regex: /(("((\\([\s\S]))|((?!(\\|"))[\s\S]*?))*")|('((\\([\s\S]))|((?!(\\|'))[\s\S]*?))*'))/, action: {"token":"string"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /\/\*/, action: {"token":"comment","next":"@comment"} },
            { regex: /(\/\/((?!(\n|\r))[\s\S]*?)(\r?\n)?)/, action: {"token":"comment"} },
            { regex: /((( |	)|\r)|\n)+/, action: {"token":"white"} },
            { regex: /([\s\S])/, action: {"token":"white"} },
        ],
        comment: [
            { regex: /[^/\*]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[/\*]/, action: {"token":"comment"} },
        ],
    }
};

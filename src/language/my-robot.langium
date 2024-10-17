grammar MyRobot

//entry Model:
//    (persons+=Person | greetings+=Greeting)*;
//
//Person:
//    'person' name=ID;
//
//Greeting:
//    'Hello' person=[Person:ID] '!';
//
//hidden terminal WS: /\s+/;
//terminal ID: /[_a-zA-Z][\w_]*/;
//terminal INT returns number: /[0-9]+/;
//terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;
//
//hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
//hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

import 'Terminals'
import 'myRobotDSL-types'
import 'XMLType-types'

entry Program returns Program:
    {Program} 'Program' name=EString  '{' ('function' '{' function+=Fonction  ("," function+=Fonction  )* '}' )? '}'  
;

Statement returns Statement:
    If | Loop | Backward | Forward | Left | Right | VariableStatement | VariableAssignation | Parameter | SetSpeed | ClockLeft | Clock | CallFunction 
;

Expression returns Expression:
    BooleanExpression | CallFunctionExpr | CallEntity | GetSensor | AddSubExpression | MultiDivExpression | Value 
;

BooleanOperator returns BooleanOperator:
    LowerThan | EqualTo | UpperThan 
;

Entity returns Entity:
    VariableStatement | Parameter 
;

UnaryExpression returns UnaryExpression:
    CallFunctionExpr | CallEntity | GetSensor | Value 
;

ArithmeticExpression returns ArithmeticExpression:
    AddSubExpression | MultiDivExpression 
;

AddSubOperator returns AddSubOperator:
    Add | Sub 
;

MultiDivOperator returns MultiDivOperator:
    Multiply | Divise 
;

EString returns string:
    STRING | ID 
;

Fonction returns Fonction:
    'Fonction' '{' 'name' name=ID  ('returntype' returntype=ReturnType  )? ('body' '{' body+=Statement  ("," body+=Statement  )* '}' )? ('parameter' '{' parameter+=Parameter  ("," parameter+=Parameter  )* '}' )? '}'  
;


ReturnType returns ReturnType:
    {ReturnType} 'ReturnType'  
;

Parameter returns Parameter:
    'Parameter' '{' 'name' name=ID  'type' type=Type ('value' value=Expression  )? '}'  
;

If returns If:
    'If' '{' 'condition' '{' condition+=BooleanExpression  ("," condition+=BooleanExpression  )* '}' ('expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' )? 'then' '{' then+=Statement  ("," then+=Statement  )* '}' ('else' '{' else+=Statement  ("," else+=Statement  )* '}' )? '}'  
;

Loop returns Loop:
    'Loop' '{' 'condition' '{' condition+=BooleanExpression  ("," condition+=BooleanExpression  )* '}' ('expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' )? ('body' '{' body+=Statement  ("," body+=Statement  )* '}' )? '}'  
;

Backward returns Backward:
    'Backward' '{' 'unit' unit=Unit  ('distance' distance=Expression  )? '}'  
;

Forward returns Forward:
    'Forward' '{' 'unit' unit=Unit  ('distance' distance=Expression  )? '}'  
;

Left returns Left:
    'Left' '{' 'unit' unit=Unit  ('distance' distance=Expression  )? '}'  
;

Right returns Right:
    'Right' '{' 'unit' unit=Unit  ('distance' distance=Expression  )? '}'  
;

VariableStatement returns VariableStatement:
    'VariableStatement' '{' 'name' name=ID  'type' type=Type  ('value' value=Expression  )? '}'  
;

VariableAssignation returns VariableAssignation:
    'VariableAssignation' '{' 'variable' variable=[VariableStatement:EString ] ('value' value=Expression  )? '}'  
;

SetSpeed returns SetSpeed:
    'SetSpeed' '{' 'unit' unit=Unit  'distance' distance=Expression  '}'  
;

ClockLeft returns ClockLeft:
    {ClockLeft} 'ClockLeft' '{' ('angle' angle=Expression  )? '}'  
;

Clock returns Clock:
    {Clock} 'Clock' '{' ('angle' angle=Expression  )? '}'  
;

CallFunction returns CallFunction:
    'CallFunction' '{' 'function' function=[Fonction:EString ] ('arguments' '{' arguments+=Expression  ("," arguments+=Expression  )* '}' )? '}'  
;

BooleanExpression returns BooleanExpression:
    'BooleanExpression' '{' 'operator' operator=BooleanOperator  'leftCondition' leftCondition=Expression  'rightCondition' rightCondition=Expression  '}'  
;

LowerThan returns LowerThan:
    {LowerThan} 'LowerThan'  
;

EqualTo returns EqualTo:
    {EqualTo} 'EqualTo'  
;

UpperThan returns UpperThan:
    {UpperThan} 'UpperThan'  
;

CallFunctionExpr returns CallFunctionExpr:
    'CallFunctionExpr' '{' 'function' function=[Fonction:EString ] ('arguments' '{' arguments+=Expression  ("," arguments+=Expression  )* '}' )? '}'  
;

CallEntity returns CallEntity:
    'CallEntity' '{' 'entity' entity=[Entity:EString ] '}'  
;

GetSensor returns GetSensor:
    {GetSensor} 'GetSensor'  
;

AddSubExpression returns AddSubExpression:
    'AddSubExpression' '{' 'leftOperand' leftOperand=UnaryExpression  ('rightOperand' '{' rightOperand+=UnaryExpression  ("," rightOperand+=UnaryExpression  )* '}' )? ('arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' )? ('operator' '{' operator+=AddSubOperator  ("," operator+=AddSubOperator  )* '}' )? '}'  
;

MultiDivExpression returns MultiDivExpression:
    'MultiDivExpression' '{' 'leftOperand' leftOperand=UnaryExpression  ('rightOperand' '{' rightOperand+=UnaryExpression  ("," rightOperand+=UnaryExpression  )* '}' )? ('arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' )? ('operator' '{' operator+=MultiDivOperator  ("," operator+=MultiDivOperator  )* '}' )? '}'  
;

Value returns Value:
    {Value} 'Value'  
;

Add returns Add:
    {Add} 'Add'  
;

Sub returns Sub:
    {Sub} 'Sub'  
;

Multiply returns Multiply:
    {Multiply} 'Multiply'  
;

Divise returns Divise:
    {Divise} 'Divise' 
;

Unit returns Unit:
    Unit_m | Unit_cm | Unit_mm
;
Unit_m returns Unit_m: 'm' ;
Unit_cm returns Unit_cm: 'cm' ;
Unit_mm returns Unit_mm: 'mm' ;

Type returns Type:
    Type_number | Type_boolean
;

Type_number returns Type_number: 'number' ;
Type_boolean returns Type_boolean: 'boolean' ;

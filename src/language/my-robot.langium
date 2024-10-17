grammar MyRobot

import 'Terminals'
import 'myRobotDSL-types'
import 'XMLType-types'


entry Program returns Program: 
    ( function+=Fonction )*
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
    'let' returntype=ReturnType name=ID '('(parameter+=Parameter ("," parameter+=Parameter  )*)?')' 
        Block
;

fragment Block: '{'( body+=Statement )*'}';

ReturnType returns ReturnType:
    type = Type | 'void' 
;

Parameter returns Parameter:
    type=Type name=ID
;

If returns If:
    'if' condition+=BooleanExpression
        'then' BlockIf ('else' BlockElse )?
;

fragment BlockIf: '{'( then+=Statement )*'}';
fragment BlockElse: '{'( else+=Statement )*'}';

Loop returns Loop:
    'loop' condition+=BooleanExpression
        Block
;

Backward returns Backward:
    'Backward' distance=Expression unit=Unit 
;

Forward returns Forward:
    'Forward' distance=Expression unit=Unit 
;

Left returns Left:
    'Left' distance=Expression unit=Unit 
;

Right returns Right:
    'Right' distance=Expression unit=Unit
;

VariableStatement returns VariableStatement:
    'var' type=Type name=ID '=' value=Expression
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

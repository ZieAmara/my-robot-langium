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
    LowerThan | EqualTo | UpperThan | Not | Or | LowerOrEqualTo | UpperOrEqualTo | And
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
    'Backward' distance=Expression 'in' unit=Unit 
;

Forward returns Forward:
    'Forward' distance=Expression 'in' unit=Unit 
;

Left returns Left:
    'Left' distance=Expression 'in' unit=Unit 
;

Right returns Right:
    'Right' distance=Expression 'in' unit=Unit
;

VariableStatement returns VariableStatement:
    'var' type=Type name=ID '=' value=Expression
;

VariableAssignation returns VariableAssignation:
    variable=[VariableStatement:EString ] '=' (value=Expression)
;

SetSpeed returns SetSpeed:
    'setSpeed' '(' distance=Expression ('in')? unit=Unit ')'  
;

ClockLeft returns ClockLeft:
    'ClockLeft' angle=Expression
;

Clock returns Clock:
    'Clock' angle=Expression   
;

CallFunction returns CallFunction:
    function=[Fonction:EString ] '(' ( arguments+=Expression  ("," arguments+=Expression  )* )? ')' 
;

BooleanExpression returns BooleanExpression:
    (leftCondition=Expression operator=BooleanOperator rightCondition=Expression) | 
    (operator= Not rightCondition=Expression) 
;

LowerThan returns LowerThan:
    {LowerThan} '<'
;

EqualTo returns EqualTo:
    {EqualTo} '=='
;

UpperThan returns UpperThan:
    {UpperThan} '>'  
;

Not returns Not:
    {Not} 'NOT'  
;

Or returns Or:
    {Or} 'OR'  
;

And returns And:
    {And} 'AND'
;

LowerOrEqualTo returns LowerOrEqualTo:
    {LowerOrEqualTo} '<='  
;

UpperOrEqualTo returns UpperOrEqualTo:
    {UpperOrEqualTo} '>='  
;

CallFunctionExpr returns CallFunctionExpr:
    function=[Fonction:EString ] '(' ( arguments+=Expression  ("," arguments+=Expression  )* )? ')'  
;

CallEntity returns CallEntity:
    entity=[Entity:EString ]  
;

GetSensor returns GetSensor:
    {GetSensor} 'getSensor' 
;

AddSubExpression returns AddSubExpression:
    leftOperand=MultiDivExpression ( operator+=AddSubOperator rightOperand+=MultiDivExpression )* 
;

MultiDivExpression returns MultiDivExpression:
    leftOperand=UnaryExpression ( operator+=MultiDivOperator rightOperand+=UnaryExpression )*
;

Value returns Value:
    {Value} INT  
;

Add returns Add:
    {Add} '+'  
;

Sub returns Sub:
    {Sub} '-'  
;

Multiply returns Multiply:
    {Multiply} '*'
;

Divise returns Divise:
    {Divise} '/' 
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

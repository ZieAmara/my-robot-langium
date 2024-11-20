grammar MyRobot

import 'Terminals'
import 'myRobotDSL-types'
import 'XMLType-types'


fragment Block: '{'( body+=Statement )*'}';
fragment BlockIf: '{'( then+=Statement )*'}';
fragment BlockElse: '{'( else+=Statement )*'}';

entry Program returns Program: 
    ( fonction+=Fonction )*
;

Fonction returns Fonction:
    'let' returntype=ReturnType name=ID '('(parameter+=Parameter ("," parameter+=Parameter  )*)?')' 
        Block
;

ReturnType returns ReturnType:
    type = Type | 'void' 
;

Statement returns Statement:
    ControlStructure | ControlRobot | Entity | VariableAssignation | SetSpeed | CallFunction 
;

ControlStructure returns ControlStructure:
    If | Loop
;

If returns If:
    'if' condition+=BooleanExpression
        'then' BlockIf ('else' BlockElse )?
;

Loop returns Loop:
    'loop' condition+=BooleanExpression
        Block
;

ControlRobot returns ControlRobot:
   Movement | Rotate 
;

Movement returns Movement:
    Backward | Forward | Left | Right 
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

Rotate returns Rotate:
    ClockLeft | Clock
;

Clock returns Clock:
    'Clock' angle=Expression   
;

ClockLeft returns ClockLeft:
    'ClockLeft' angle=Expression
;

Entity returns Entity:
    VariableStatement | Parameter
;

Parameter returns Parameter:
    type=Type name=ID
;

VariableStatement returns VariableStatement:
    'var' type = (Type | Unit) name=ID '=' value=Expression
;

VariableAssignation returns VariableAssignation:
    variable=[VariableStatement:EString ] '=' value=Expression
;

SetSpeed returns SetSpeed:
    'setSpeed' '(' distance=Expression ('in')? unit=Unit ')'  
;

CallFunction returns CallFunction:
    fonction=[Fonction:EString ] '(' ( arguments+=Expression  ("," arguments+=Expression  )* )? ')' 
;

Expression returns Expression:
    UnaryBooleanExpression | UnaryArithmeticExpression | ArithmeticExpression | BooleanExpression
;

UnaryBooleanExpression returns UnaryBooleanExpression:
    {UnaryBooleanExpression} 'True' | 'False'
;

UnaryArithmeticExpression returns UnaryArithmeticExpression:
    CallFunctionExpr | CallEntity | GetSensor | Value
;

CallFunctionExpr returns CallFunctionExpr:
    fonction=[Fonction:EString ] '(' ( arguments+=Expression  ("," arguments+=Expression  )* )? ')'  
;

CallEntity returns CallEntity:
    entity=[Entity:EString ]  
;

GetSensor returns GetSensor:
    {GetSensor} 'getTimestamp()' | 'getDistance()' | 'getSpeed()'
;

Value returns Value:
    {Value} INT
;

ArithmeticExpression returns ArithmeticExpression:
    leftOperand=UnaryArithmeticExpression ( operator+=ArithmeticOperator rightOperand+=UnaryArithmeticExpression )*
;

ArithmeticOperator returns ArithmeticOperator:
    Add | Sub | Multiply | Divise
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

BooleanExpression returns BooleanExpression:
    (leftCondition=UnaryArithmeticExpression operator=BooleanOperator rightCondition=UnaryArithmeticExpression) | 
    (operator= Not rightCondition=UnaryArithmeticExpression)
;

BooleanOperator returns BooleanOperator:
    LowerThan | EqualTo | UpperThan | Not | Or | LowerOrEqualTo | UpperOrEqualTo | And
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

EString returns string:
    STRING | ID 
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

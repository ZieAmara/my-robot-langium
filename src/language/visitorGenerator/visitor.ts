
import * as ASTInterfaces from '../generated/ast.js';
import { AstNode, Reference } from 'langium';

export interface Visitor{
    visitProgram(node : Program) : any;
	visitFonction(node : Fonction) : any;
	visitReturnType(node : ReturnType) : any;
	visitStatement(node : Statement) : any;
	visitReturnStatement(node : ReturnStatement) : any;
	visitIf(node : If) : any;
	visitLoop(node : Loop) : any;
	visitControlRobot(node : ControlRobot) : any;
	visitMovement(node : Movement) : any;
	visitBackward(node : Backward) : any;
	visitForward(node : Forward) : any;
	visitLeft(node : Left) : any;
	visitRight(node : Right) : any;
	visitRotate(node : Rotate) : any;
	visitClock(node : Clock) : any;
	visitClockLeft(node : ClockLeft) : any;
	visitEntity(node : Entity) : any;
	visitParameter(node : Parameter) : any;
	visitVariableStatement(node : VariableStatement) : any;
	visitVariableAssignation(node : VariableAssignation) : any;
	visitSetSpeed(node : SetSpeed) : any;
	visitCallFunction(node : CallFunction) : any;
	visitExpression(node : Expression) : any;
	visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any;
	visitUnaryArithmeticExpression(node : UnaryArithmeticExpression) : any;
	visitCallFunctionExpr(node : CallFunctionExpr) : any;
	visitCallEntity(node : CallEntity) : any;
	visitGetSensor(node : GetSensor) : any;
    visitGetDistance(node : GetDistance) : any;
    visitGetSpeed(node : GetSpeed) : any;
    visitGetTimestamp(node : GetTimestamp) : any;
	visitValue(node : Value) : any;
    visitArithmeticExpression(node : ArithmeticExpression) : any;
	visitAddSubExpression(node : AddSubExpression) : any;
	visitMultiDivExpression(node : MultiDivExpression) : any;
	visitAddSubOperator(node : AddSubOperator) : any;
	visitMultiDivOperator(node : MultiDivOperator) : any;
	visitAdd(node : Add) : any;
	visitSub(node : Sub) : any;
	visitMultiply(node : Multiply) : any;
	visitDivise(node : Divise) : any;
	visitBooleanExpression(node : BooleanExpression) : any;
	visitBooleanOperator(node : BooleanOperator) : any;
	visitLowerThan(node : LowerThan) : any;
	visitEqualTo(node : EqualTo) : any;
	visitUpperThan(node : UpperThan) : any;
	visitNot(node : Not) : any;
	visitOr(node : Or) : any;
	visitLowerOrEqualTo(node : LowerOrEqualTo) : any;
	visitUpperOrEqualTo(node : UpperOrEqualTo) : any;
	visitAnd(node : And) : any;
}


export type ID = string;

export type Type = Type_boolean | Type_number;

export type Type_boolean = 'boolean';

export type Type_number = 'number';

export type Unit = Unit_cm | Unit_m | Unit_mm;

export type Unit_cm = 'cm';

export type Unit_m = 'm';

export type Unit_mm = 'mm';


export class Program implements ASTInterfaces.Program {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $type: 'Program',
        public fonction: Array<Fonction>
    ){}
    accept(visitor: Visitor) : any {}
}

export class Fonction implements ASTInterfaces.Fonction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $container: Program,
        public $type: 'Fonction',
        public body: Array<Statement>,
        public name: ID,
        public parameter: Array<Parameter>,
        public returntype?: ReturnType
    ){}
    accept(visitor: Visitor) : any {}
}

export class ReturnType implements ASTInterfaces.ReturnType {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $container: Fonction,
        public $type: 'ReturnType',
        public returnType: 'void' | Type
    ){}
    accept(visitor: Visitor) : any {}
}

export class Statement implements ASTInterfaces.Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $type: 'Backward' | 'CallFunction' | 'Clock' | 'ClockLeft' | 'ControlRobot' | 'Entity' | 'Forward' | 'If' | 'Left' | 'Loop' | 'Movement' | 'Parameter' | 'ReturnStatement' | 'Right' | 'Rotate' | 'SetSpeed' | 'Statement' | 'VariableAssignation' | 'VariableStatement'
    ){}
    accept(visitor: Visitor) : any {}
}

export class ReturnStatement  extends Statement  implements ASTInterfaces.ReturnStatement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'ReturnStatement',
        public returnValue: Expression
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class If extends Statement  implements ASTInterfaces.If {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'If',
        public condition: BooleanExpression,
        public thenStatement: Array<Statement>,
        public elseStatement: Array<Statement>,
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Loop extends Statement implements ASTInterfaces.Loop {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Loop',
        public condition: BooleanExpression,
        public body: Array<Statement>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class ControlRobot extends Statement implements ASTInterfaces.ControlRobot {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Backward' | 'Clock' | 'ClockLeft' | 'ControlRobot' | 'Forward' | 'Left' | 'Movement' | 'Right' | 'Rotate'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Movement extends ControlRobot implements ASTInterfaces.Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Backward' | 'Forward' | 'Left' | 'Movement' | 'Right',
        public unit: Unit,
        public distance?: Expression
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Backward extends Movement implements ASTInterfaces.Backward {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Backward'
    ){
        super($type, 'cm')
    }
    override accept(visitor: Visitor) : any {}
}

export class Forward extends Movement implements ASTInterfaces.Forward {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Forward'
    ){
        super($type, 'cm')
    }
    override accept(visitor: Visitor) : any {}
}

export class Left extends Movement implements ASTInterfaces.Left {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Left'
    ){
        super($type, 'cm')
    }
    override accept(visitor: Visitor) : any {}
}

export class Right extends Movement implements ASTInterfaces.Right {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Right'
    ){
        super($type, 'cm')
    }
    override accept(visitor: Visitor) : any {}
}

export class Rotate extends ControlRobot implements ASTInterfaces.Rotate {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Clock' | 'ClockLeft' | 'Rotate',
        public angle?: Expression
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Clock extends Rotate implements ASTInterfaces.Clock {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Clock'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class ClockLeft extends Rotate implements ASTInterfaces.ClockLeft {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'ClockLeft'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Entity extends Statement implements ASTInterfaces.Entity {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type:  'Entity' | 'Parameter' | 'VariableStatement',
        public name: ID,
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Parameter extends Entity implements ASTInterfaces.Parameter {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $container: Fonction,
        public override $type: 'Parameter',
        public type: 'number' | 'boolean'
    ){
        super($type, '')
    }
    override accept(visitor: Visitor) : any {}
}

export class VariableStatement extends Statement implements ASTInterfaces.VariableStatement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'VariableStatement',
        public name: ID,
        public type: Type | Unit
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class VariableAssignation extends Statement implements ASTInterfaces.VariableAssignation {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'VariableAssignation',
        public variable: Reference<VariableStatement>,
        public value?: Expression
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class SetSpeed extends Statement implements ASTInterfaces.SetSpeed {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'SetSpeed',
        public distance: Expression,
        public unit: Unit
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class CallFunction extends Statement implements ASTInterfaces.CallFunction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'CallFunction',
        public args: Array<Expression>,
        public fonction: Reference<Fonction>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Expression implements ASTInterfaces.Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $type: 'AddSubExpression' | 'ArithmeticExpression' | 'BooleanExpression' | 'CallEntity' | 'CallFunctionExpr' | 'Expression' | 'GetDistance' | 'GetSensor' | 'GetSpeed' | 'GetTimestamp' | 'MultiDivExpression' | 'UnaryArithmeticExpression' | 'UnaryBooleanExpression' | 'Value'
    ){}
    accept(visitor: Visitor) : any {}
}

export class UnaryBooleanExpression implements ASTInterfaces.UnaryBooleanExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $type: 'UnaryBooleanExpression',
        public value: boolean
    ){}
    accept(visitor: Visitor) : any {}
}

export class UnaryArithmeticExpression extends Expression implements ASTInterfaces.UnaryArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'CallEntity' | 'CallFunctionExpr' | 'GetDistance' | 'GetSensor' | 'GetSpeed' | 'GetTimestamp' | 'UnaryArithmeticExpression' | 'Value'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class CallFunctionExpr extends UnaryArithmeticExpression implements ASTInterfaces.CallFunctionExpr {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'CallFunctionExpr',
        public args: Array<Expression>,
        public fonction: Reference<Fonction>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class CallEntity extends UnaryArithmeticExpression implements ASTInterfaces.CallEntity {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'CallEntity',
        public entity: Reference<Entity>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class GetSensor extends UnaryArithmeticExpression implements ASTInterfaces.GetSensor {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'GetDistance' | 'GetSensor' | 'GetSpeed' | 'GetTimestamp',
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class GetDistance extends GetSensor implements ASTInterfaces.GetDistance {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'GetDistance',
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class GetSpeed extends GetSensor implements ASTInterfaces.GetSpeed {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'GetSpeed',
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class GetTimestamp extends GetSensor implements ASTInterfaces.GetTimestamp {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'GetTimestamp',
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Value extends UnaryArithmeticExpression implements ASTInterfaces.Value {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Value',
        public value: number
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class ArithmeticExpression extends Expression implements ASTInterfaces.ArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'ArithmeticExpression' | 'AddSubExpression' | 'MultiDivExpression',
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class AddSubExpression extends ArithmeticExpression implements ASTInterfaces.AddSubExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'AddSubExpression',
        public leftOperand: MultiDivExpression,
        public operator: Array<AddSubOperator>,
        public rightOperand: Array<MultiDivExpression>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class MultiDivExpression extends ArithmeticExpression implements ASTInterfaces.MultiDivExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $container: AddSubExpression,
        public override $type: 'MultiDivExpression',
        public leftOperand: UnaryArithmeticExpression,
        public operator: Array<MultiDivOperator>,
        public rightOperand: Array<UnaryArithmeticExpression>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class AddSubOperator implements ASTInterfaces.AddSubOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Add' | 'AddSubOperator' | 'Sub'){}
    accept(visitor: Visitor) : any {}
}

export class Add extends AddSubOperator implements ASTInterfaces.Add {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Add',
        public symbole: '+'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Sub extends AddSubOperator implements ASTInterfaces.Sub {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Sub',
        public symbole: '-'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class MultiDivOperator implements ASTInterfaces.MultiDivOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'MultiDivOperator' | 'Divise' | 'Multiply' ){}
    accept(visitor: Visitor) : any {}
}

export class Multiply extends MultiDivOperator implements ASTInterfaces.Multiply {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Multiply',
        public symbole: '*'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Divise extends MultiDivOperator implements ASTInterfaces.Divise {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Divise',
        public symbole: '/'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class BooleanExpression extends Expression implements ASTInterfaces.BooleanExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $container: If | Loop,
        public override $type: 'BooleanExpression',
        public operator: BooleanOperator,
        public rightCondition: UnaryArithmeticExpression,
        public leftCondition?: UnaryArithmeticExpression
    ){
        super($type);
    }
    override accept(visitor: Visitor) : any {}
}

export class BooleanOperator implements ASTInterfaces.BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $type: 'And' | 'BooleanOperator' | 'EqualTo' | 'LowerOrEqualTo' | 'LowerThan' | 'Not' | 'Or' | 'UpperOrEqualTo' | 'UpperThan'
    ){}
    accept(visitor: Visitor) : any {}
}

export class LowerThan extends BooleanOperator implements ASTInterfaces.LowerThan {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'LowerThan',
        public symbole: '<'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class EqualTo extends BooleanOperator implements ASTInterfaces.EqualTo {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'EqualTo',
        public symbole: '=='
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class UpperThan extends BooleanOperator implements ASTInterfaces.UpperThan {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'UpperThan',
        public symbole: '>'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Not extends BooleanOperator implements ASTInterfaces.Not {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Not',
        public symbole: '!'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Or extends BooleanOperator implements ASTInterfaces.Or {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Or',
        public symbole: '||'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class LowerOrEqualTo extends BooleanOperator implements ASTInterfaces.LowerOrEqualTo {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'LowerOrEqualTo',
        public symbole: '<='
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class UpperOrEqualTo extends BooleanOperator implements ASTInterfaces.UpperOrEqualTo {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'UpperOrEqualTo',
        public symbole: '>='
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class And extends BooleanOperator implements ASTInterfaces.And {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'And',
        public symbole: '&&'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}


export function acceptNode(node: AstNode, visitor: Visitor): any {
    switch (node.$type) {
        case 'Program':
            return (node as Program).accept(visitor);
        case 'Fonction':
            return (node as Fonction).accept(visitor);
        case 'ReturnType':
            return (node as ReturnType).accept(visitor);
        case 'Statement':
            return (node as Statement).accept(visitor);
        case 'ReturnStatement':
            return (node as ReturnStatement).accept(visitor);
        case 'If':
            return (node as If).accept(visitor);
        case 'Loop':
            return (node as Loop).accept(visitor);
        case 'ControlRobot':
            return (node as ControlRobot).accept(visitor);
        case 'Movement':
            return (node as Movement).accept(visitor);
        case 'Backward':
            return (node as Backward).accept(visitor);
        case 'Forward':
            return (node as Forward).accept(visitor);
        case 'Left':
            return (node as Left).accept(visitor);
        case 'Right':
            return (node as Right).accept(visitor);
        case 'Rotate':
            return (node as Rotate).accept(visitor);
        case 'Clock':
            return (node as Clock).accept(visitor);
        case 'ClockLeft':
            return (node as ClockLeft).accept(visitor);
        case 'Entity':
            return (node as Entity).accept(visitor);
        case 'Parameter':
            return (node as Parameter).accept(visitor);
        case 'VariableStatement':
            return (node as VariableStatement).accept(visitor);
        case 'VariableAssignation':
            return (node as VariableAssignation).accept(visitor);
        case 'SetSpeed':
            return (node as SetSpeed).accept(visitor);
        case 'CallFunction':
            return (node as CallFunction).accept(visitor);
        case 'Expression':
            return (node as Expression).accept(visitor);
        case 'UnaryBooleanExpression':
            return (node as UnaryBooleanExpression).accept(visitor);
        case 'UnaryArithmeticExpression':
            return (node as UnaryArithmeticExpression).accept(visitor);
        case 'CallFunctionExpr':
            return (node as CallFunctionExpr).accept(visitor);
        case 'CallEntity':
            return (node as CallEntity).accept(visitor);
        case 'GetSensor':
            return (node as GetSensor).accept(visitor);
        case 'Value':
            return (node as Value).accept(visitor);
        case 'ArithmeticExpression':
            return (node as ArithmeticExpression).accept(visitor);
        case 'AddSubExpression':
            return (node as AddSubExpression).accept(visitor);
        case 'MultiDivExpression':
            return (node as MultiDivExpression).accept(visitor);
        case 'AddSubOperator':
            return (node as AddSubOperator).accept(visitor);
        case 'MultiDivOperator':
            return (node as MultiDivOperator).accept(visitor);
        case 'Add':
            return (node as Add).accept(visitor);
        case 'Sub':
            return (node as Sub).accept(visitor);
        case 'Multiply':
            return (node as Multiply).accept(visitor);
        case 'Divise':
            return (node as Divise).accept(visitor);
        case 'BooleanExpression':
            return (node as BooleanExpression).accept(visitor);
        case 'BooleanOperator':
            return (node as BooleanOperator).accept(visitor);
        case 'LowerThan':
            return (node as LowerThan).accept(visitor);
        case 'EqualTo':
            return (node as EqualTo).accept(visitor);
        case 'UpperThan':
            return (node as UpperThan).accept(visitor);
        case 'Not':
            return (node as Not).accept(visitor);
        case 'Or':
            return (node as Or).accept(visitor);
        case 'LowerOrEqualTo':
            return (node as LowerOrEqualTo).accept(visitor);
        case 'UpperOrEqualTo':
            return (node as UpperOrEqualTo).accept(visitor);
        case 'And':
            return (node as And).accept(visitor);
        case 'GetDistance':
            return (node as GetDistance).accept(visitor);
        case 'GetTimestamp':
            return (node as GetTimestamp).accept(visitor);
        case 'GetSpeed':
            return (node as GetSpeed).accept(visitor);
        default:
            throw new Error(`Unknown node type: ${node.$type}`);
    }
}

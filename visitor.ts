
import * as ASTInterfaces from '../generated/ast.js';
import { Reference } from 'langium';

export interface Visitor{
    visitProgram(node : Program) : any;
	visitFonction(node : Fonction) : any;
	visitReturnType(node : ReturnType) : any;
	visitStatement(node : Statement) : any;
	visitControlStructure(node : ControlStructure) : any;
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
	visitValue(node : Value) : any;
	visitArithmeticExpression(node : ArithmeticExpression) : any;
	visitArithmeticOperator(node : ArithmeticOperator) : any;
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
        public type: 'void' | Type
    ){}
    accept(visitor: Visitor) : any {}
}

export class Statement implements ASTInterfaces.Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public $type: 'Backward' | 'CallFunction' | 'Clock' | 'ClockLeft' | 'ControlRobot' | 'ControlStructure' | 'Entity' | 'Forward' | 'If' | 'Left' | 'Loop' | 'Movement' | 'Parameter' | 'Right' | 'Rotate' | 'SetSpeed' | 'Statement' | 'VariableAssignation' | 'VariableStatement'
    ){}
    accept(visitor: Visitor) : any {}
}

export class ControlStructure  extends Statement  implements ASTInterfaces.ControlStructure {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'ControlStructure' | 'If' | 'Loop',
        public body: Array<Statement>,
        public condition: Array<BooleanExpression>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class If extends ControlStructure  implements ASTInterfaces.If {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'If',
        public elseStatement: Array<Statement>,
        public thenStatement: Array<Statement>
    ){
        super($type, [...thenStatement, ...elseStatement], [])
    }
    override accept(visitor: Visitor) : any {}
}

export class Loop extends ControlStructure implements ASTInterfaces.Loop {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Loop'
    ){
        super($type, [], [])
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
        public override $type:  'Entity' | 'Parameter' | 'VariableStatement'
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
        public name: string,
        public type: 'number' | 'boolean'
    ){
        super($type)
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
        public arguments: Array<Expression>,
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
        public $type: 'ArithmeticExpression' | 'BooleanExpression' | 'CallEntity' | 'CallFunctionExpr' | 'Expression' | 'GetSensor' | 'UnaryArithmeticExpression' | 'UnaryBooleanExpression' | 'Value'
    ){}
    accept(visitor: Visitor) : any {}
}

export class UnaryBooleanExpression implements ASTInterfaces.UnaryBooleanExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'UnaryBooleanExpression'){}
    accept(visitor: Visitor) : any {}
}

export class UnaryArithmeticExpression extends Expression implements ASTInterfaces.UnaryArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'CallEntity' | 'CallFunctionExpr' | 'GetSensor' | 'UnaryArithmeticExpression' | 'Value'
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
        public arguments: Array<Expression>,
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
        public override $type: 'GetSensor'
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
        public override $type: 'Value'
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
        public override $type: 'ArithmeticExpression',
        public leftOperand: UnaryArithmeticExpression,
        public operator: Array<ArithmeticOperator>,
        public rightOperand: Array<UnaryArithmeticExpression>
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class ArithmeticOperator implements ASTInterfaces.ArithmeticOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Add' | 'ArithmeticOperator' | 'Divise' | 'Multiply' | 'Sub'){}
    accept(visitor: Visitor) : any {}
}

export class Add extends ArithmeticOperator implements ASTInterfaces.Add {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Add'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Sub extends ArithmeticOperator implements ASTInterfaces.Sub {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Sub'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Multiply extends ArithmeticOperator implements ASTInterfaces.Multiply {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Multiply'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}

export class Divise extends ArithmeticOperator implements ASTInterfaces.Divise {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        public override $type: 'Divise'
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
        public $container: ControlStructure,
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
        public override $type: 'LowerThan'
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
        public override $type: 'EqualTo'
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
        public override $type: 'UpperThan'
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
        public override $type: 'Not'
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
        public override $type: 'Or'
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
        public override $type: 'LowerOrEqualTo'
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
        public override $type: 'UpperOrEqualTo'
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
        public override $type: 'And'
    ){
        super($type)
    }
    override accept(visitor: Visitor) : any {}
}


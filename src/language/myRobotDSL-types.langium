import 'XMLType-types'

type Type = Type_number | Type_boolean;
type Type_number = 'number';
type Type_boolean = 'boolean';

type Unit = Unit_m | Unit_cm | Unit_mm;
type Unit_m = 'm';
type Unit_cm = 'cm';
type Unit_mm = 'mm';

interface Program {
	name?: string
	function: Fonction[]
}

interface Fonction {
	name: ID
	returntype?: ReturnType
	body: Statement[]
	parameter: Parameter[]
}

interface ReturnType {
	type: Type | 'void'
}

interface Statement {
}

interface Parameter extends Entity {
	name: ID
	type: Type
}

interface Entity extends Statement {
	value?: Expression
}

interface Expression {
}

interface BooleanOperator {
}

interface UnaryExpression extends Expression {
}

interface ArithmeticExpression extends Expression {
	leftOperand: MultiDivExpression
	rightOperand: MultiDivExpression[]
	arithmeticexpression: ArithmeticExpression[]
}

interface AddSubOperator {
}

interface MultiDivOperator {
}

interface If extends ControlStructure {
	then: Statement[]
	else: Statement[]
}

interface ControlStructure extends Statement {
	condition: BooleanExpression[]
	expression: Expression[]
}

interface BooleanExpression extends Expression {
	operator: BooleanOperator
	leftCondition: Expression
	rightCondition: Expression
}

interface Loop extends ControlStructure {
	body: Statement[]
}

interface Backward extends Movement {
}

interface Movement extends ControlRobot {
	unit: Unit
	distance?: Expression
}

interface ControlRobot extends Statement {
}

interface Forward extends Movement {
}

interface Left extends Movement {
}

interface Right extends Movement {
}

interface VariableStatement extends Entity {
	name: ID
	type: Type
}

interface VariableAssignation extends Statement {
	variable: @VariableStatement
	value?: Expression
}

interface SetSpeed extends Statement {
	unit: Unit
	distance: Expression
}

interface ClockLeft extends Rotate {
}

interface Rotate extends ControlRobot {
	angle?: Expression
}

interface Clock extends Rotate {
}

interface CallFunction extends Statement {
	function: @Fonction
	arguments: Expression[]
}

interface LowerThan extends BooleanOperator {
}

interface EqualTo extends BooleanOperator {
}

interface UpperThan extends BooleanOperator {
}

interface Not extends BooleanOperator {
}

interface Or extends BooleanOperator {
}

interface LowerOrEqualTo extends BooleanOperator {
}

interface UpperOrEqualTo extends BooleanOperator {
}

interface And extends BooleanOperator {
}

interface CallFunctionExpr extends UnaryExpression {
	function: @Fonction
	arguments: Expression[]
}

interface CallEntity extends UnaryExpression {
	entity: @Entity
}

interface GetSensor extends UnaryExpression {
}

interface AddSubExpression extends ArithmeticExpression {
	operator: AddSubOperator[]
}

interface MultiDivExpression {
	leftOperand: UnaryExpression
	operator: MultiDivOperator[]
	rightOperand: UnaryExpression[]
}

interface Value extends UnaryExpression {
}

interface Add extends AddSubOperator {
}

interface Sub extends AddSubOperator {
}

interface Multiply extends MultiDivOperator {
}

interface Divise extends MultiDivOperator {
}


import 'XMLType-types'

interface Program {
  fonction: Fonction[];
}

interface Fonction {
  name: ID;
  returnType?: ReturnType;
  parameter: Parameter[];
  body: Statement[];
}

interface ReturnType {
  returnType: Type | 'void';
}

interface Statement {}

interface ReturnStatement extends Statement {
  returnValue: Expression;
}

interface If extends Statement{
  condition: BooleanExpression;
  thenStatement: Statement[];
  elseStatement?: Statement[];
}

interface Loop extends Statement {
  condition: BooleanExpression;
  body: Statement[];
}

interface ControlRobot extends Statement {}

interface Movement extends ControlRobot {
  unit: Unit;
  distance?: Expression;
}

interface Backward extends Movement {}

interface Forward extends Movement {}

interface Left extends Movement {}

interface Right extends Movement {}

interface Rotate extends ControlRobot {
  angle?: Expression;
}

interface Clock extends Rotate {}

interface ClockLeft extends Rotate {}

interface Entity extends Statement {
  name: ID;
  value?: Expression;
}

interface Parameter extends Entity {
  type: Type;
}

interface VariableStatement extends Entity {
  type: Type | Unit;
}

interface VariableAssignation extends Statement {
  variable: @VariableStatement;
  value?: Expression;
}

interface SetSpeed extends Statement {
  unit: Unit;
  distance: Expression;
}

interface CallFunction extends Statement {
  fonction: @Fonction;
  args?: Expression[];
}

interface Expression {}

interface UnaryBooleanExpression extends Expression {
  value: boolean;
}

interface UnaryArithmeticExpression extends Expression {}

interface CallFunctionExpr extends UnaryArithmeticExpression {
  fonction: @Fonction;
  args?: Expression[];
}

interface CallEntity extends UnaryArithmeticExpression {
  entity: @Entity;
}

interface GetSensor extends UnaryArithmeticExpression {}

interface GetDistance extends GetSensor {}

interface GetSpeed extends GetSensor {}

interface GetTimestamp extends GetSensor {}

interface Value extends UnaryArithmeticExpression {
  value: number;
}

interface ArithmeticExpression extends Expression {}

interface AddSubExpression extends ArithmeticExpression {
  leftOperand: MultiDivExpression;
  operator: AddSubOperator[];
  rightOperand: MultiDivExpression[];
}

interface MultiDivExpression extends ArithmeticExpression {
  leftOperand: UnaryArithmeticExpression;
  operator: MultiDivOperator[];
  rightOperand: UnaryArithmeticExpression[];
}

interface AddSubOperator {}

interface MultiDivOperator {}

interface Add extends AddSubOperator {
  symbole: '+' 
}

interface Sub extends AddSubOperator {
  symbole: '-'
}

interface Multiply extends MultiDivOperator {
  symbole: '*'
}

interface Divise extends MultiDivOperator {
  symbole: '/'
}

interface BooleanExpression extends Expression {
  leftCondition?: UnaryArithmeticExpression;
  operator: BooleanOperator;
  rightCondition: UnaryArithmeticExpression;
}

interface BooleanOperator {}

interface LowerThan extends BooleanOperator {
  symbole: '<'
}

interface EqualTo extends BooleanOperator {
  symbole: '=='
}

interface UpperThan extends BooleanOperator {
  symbole: '>'
}

interface Not extends BooleanOperator {
  symbole: '!'
}

interface Or extends BooleanOperator {
  symbole: '||'
}

interface And extends BooleanOperator {
  symbole: '&&'
}

interface LowerOrEqualTo extends BooleanOperator {
  symbole?: '<='
}

interface UpperOrEqualTo extends BooleanOperator {
  symbole?: '>='
}
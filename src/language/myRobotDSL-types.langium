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
  value?: Expression;
}

interface Parameter extends Entity {
  name: ID;
  type: Type;
}

interface VariableStatement extends Entity {
  name: ID;
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

interface UnaryBooleanExpression extends Expression {}

interface UnaryArithmeticExpression extends Expression {}

interface CallFunctionExpr extends UnaryArithmeticExpression {
  fonction: @Fonction;
  args?: Expression[];
}

interface CallEntity extends UnaryArithmeticExpression {
  entity: @Entity;
}

interface GetSensor extends UnaryArithmeticExpression {}

interface Value extends UnaryArithmeticExpression {
  value: number;
}

interface ArithmeticExpression extends Expression {
  leftOperand: UnaryArithmeticExpression;
  operator: ArithmeticOperator[];
  rightOperand: UnaryArithmeticExpression[];
}

interface ArithmeticOperator {}

interface Add extends ArithmeticOperator {}

interface Sub extends ArithmeticOperator {}

interface Multiply extends ArithmeticOperator {}

interface Divise extends ArithmeticOperator {}

interface BooleanExpression extends Expression {
  leftCondition?: UnaryArithmeticExpression;
  operator: BooleanOperator;
  rightCondition: UnaryArithmeticExpression;
}

interface BooleanOperator {}

interface LowerThan extends BooleanOperator {}

interface EqualTo extends BooleanOperator {}

interface UpperThan extends BooleanOperator {}

interface Not extends BooleanOperator {}

interface Or extends BooleanOperator {}

interface And extends BooleanOperator {}

interface LowerOrEqualTo extends BooleanOperator {}

interface UpperOrEqualTo extends BooleanOperator {}
import 'XMLType-types'

type Type = Type_number | Type_boolean;
type Type_number = 'number';
type Type_boolean = 'boolean';

type Unit = Unit_m | Unit_cm | Unit_mm;
type Unit_m = 'm';
type Unit_cm = 'cm';
type Unit_mm = 'mm';

interface Program {
  function: Fonction[];
}

interface Fonction {
  name: ID;
  returntype?: ReturnType;
  parameter: Parameter[];
  body: Statement[];
}

interface ReturnType {
  type: Type | 'void';
}

interface Statement {}

interface ControlStructure extends Statement {
  condition: BooleanExpression[];
  body: Statement[];
}

interface If extends ControlStructure {
  then: Statement[];
  else?: Statement[];
}

interface Loop extends ControlStructure {}

interface ControlRobot extends Statement {}

interface Movement extends ControlRobot {
  unit: Unit;
  distance?: UnaryArithmeticExpression;
}

interface Backward extends Movement {}

interface Forward extends Movement {}

interface Left extends Movement {}

interface Right extends Movement {}

interface Rotate extends ControlRobot {
  angle?: UnaryArithmeticExpression;
}

interface Clock extends Rotate {}

interface ClockLeft extends Rotate {}

interface Entity extends Statement {
  value?: UnaryArithmeticExpression | UnaryBooleanExpression;
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
  value?: UnaryArithmeticExpression | UnaryBooleanExpression;
}

interface SetSpeed extends Statement {
  unit: Unit;
  distance: UnaryArithmeticExpression;
}

interface CallFunction extends Statement {
  function: @Fonction;
  arguments?: Expression[];
}

interface Expression {}

interface UnaryBooleanExpression extends Expression {}

interface UnaryArithmeticExpression extends Expression {}

interface CallFunctionExpr extends UnaryArithmeticExpression {
  function: @Fonction;
  arguments?: Expression[];
}

interface CallEntity extends UnaryArithmeticExpression {
  entity: @Entity;
}

interface GetSensor extends UnaryArithmeticExpression {}

interface Value extends UnaryArithmeticExpression {}

interface ArithmeticExpression extends Expression {
  leftOperand: UnaryArithmeticExpression;
  operator: ArithmeticOperator;
  rightOperand: UnaryArithmeticExpression | ArithmeticExpression;
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
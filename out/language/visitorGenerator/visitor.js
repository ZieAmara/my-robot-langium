export class Program {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, fonction) {
        this.$type = $type;
        this.fonction = fonction;
    }
    accept(visitor) { }
}
export class Fonction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, body, name, parameter, returntype) {
        this.$container = $container;
        this.$type = $type;
        this.body = body;
        this.name = name;
        this.parameter = parameter;
        this.returntype = returntype;
    }
    accept(visitor) { }
}
export class ReturnType {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, returnType) {
        this.$container = $container;
        this.$type = $type;
        this.returnType = returnType;
    }
    accept(visitor) { }
}
export class Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class ReturnStatement extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, returnValue) {
        super($type);
        this.$type = $type;
        this.returnValue = returnValue;
    }
    accept(visitor) { }
}
export class If extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, condition, thenStatement, elseStatement) {
        super($type);
        this.$type = $type;
        this.condition = condition;
        this.thenStatement = thenStatement;
        this.elseStatement = elseStatement;
    }
    accept(visitor) { }
}
export class Loop extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, condition, body) {
        super($type);
        this.$type = $type;
        this.condition = condition;
        this.body = body;
    }
    accept(visitor) { }
}
export class ControlRobot extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Movement extends ControlRobot {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, unit, distance) {
        super($type);
        this.$type = $type;
        this.unit = unit;
        this.distance = distance;
    }
    accept(visitor) { }
}
export class Backward extends Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type, 'cm');
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Forward extends Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type, 'cm');
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Left extends Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type, 'cm');
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Right extends Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type, 'cm');
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Rotate extends ControlRobot {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, angle) {
        super($type);
        this.$type = $type;
        this.angle = angle;
    }
    accept(visitor) { }
}
export class Clock extends Rotate {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class ClockLeft extends Rotate {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Entity extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Parameter extends Entity {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, name, type) {
        super($type);
        this.$container = $container;
        this.$type = $type;
        this.name = name;
        this.type = type;
    }
    accept(visitor) { }
}
export class VariableStatement extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, name, type) {
        super($type);
        this.$type = $type;
        this.name = name;
        this.type = type;
    }
    accept(visitor) { }
}
export class VariableAssignation extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, variable, value) {
        super($type);
        this.$type = $type;
        this.variable = variable;
        this.value = value;
    }
    accept(visitor) { }
}
export class SetSpeed extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, distance, unit) {
        super($type);
        this.$type = $type;
        this.distance = distance;
        this.unit = unit;
    }
    accept(visitor) { }
}
export class CallFunction extends Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, args, fonction) {
        super($type);
        this.$type = $type;
        this.args = args;
        this.fonction = fonction;
    }
    accept(visitor) { }
}
export class Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class UnaryBooleanExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, value) {
        this.$type = $type;
        this.value = value;
    }
    accept(visitor) { }
}
export class UnaryArithmeticExpression extends Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class CallFunctionExpr extends UnaryArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, args, fonction) {
        super($type);
        this.$type = $type;
        this.args = args;
        this.fonction = fonction;
    }
    accept(visitor) { }
}
export class CallEntity extends UnaryArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, entity) {
        super($type);
        this.$type = $type;
        this.entity = entity;
    }
    accept(visitor) { }
}
export class GetSensor extends UnaryArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class GetDistance extends GetSensor {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class GetSpeed extends GetSensor {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class GetTimestamp extends GetSensor {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        super($type);
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Value extends UnaryArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, value) {
        super($type);
        this.$type = $type;
        this.value = value;
    }
    accept(visitor) { }
}
export class ArithmeticExpression extends Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, leftOperand, operator, rightOperand) {
        super($type);
        this.$type = $type;
        this.leftOperand = leftOperand;
        this.operator = operator;
        this.rightOperand = rightOperand;
    }
    accept(visitor) { }
}
export class ArithmeticOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Add extends ArithmeticOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class Sub extends ArithmeticOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class Multiply extends ArithmeticOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class Divise extends ArithmeticOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class BooleanExpression extends Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, operator, rightCondition, leftCondition) {
        super($type);
        this.$container = $container;
        this.$type = $type;
        this.operator = operator;
        this.rightCondition = rightCondition;
        this.leftCondition = leftCondition;
    }
    accept(visitor) { }
}
export class BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class LowerThan extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class EqualTo extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class UpperThan extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class Not extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class Or extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class LowerOrEqualTo extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class UpperOrEqualTo extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export class And extends BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, symbole) {
        super($type);
        this.$type = $type;
        this.symbole = symbole;
    }
    accept(visitor) { }
}
export function acceptNode(node, visitor) {
    switch (node.$type) {
        case 'Program':
            return node.accept(visitor);
        case 'Fonction':
            return node.accept(visitor);
        case 'ReturnType':
            return node.accept(visitor);
        case 'Statement':
            return node.accept(visitor);
        case 'ReturnStatement':
            return node.accept(visitor);
        case 'If':
            return node.accept(visitor);
        case 'Loop':
            return node.accept(visitor);
        case 'ControlRobot':
            return node.accept(visitor);
        case 'Movement':
            return node.accept(visitor);
        case 'Backward':
            return node.accept(visitor);
        case 'Forward':
            return node.accept(visitor);
        case 'Left':
            return node.accept(visitor);
        case 'Right':
            return node.accept(visitor);
        case 'Rotate':
            return node.accept(visitor);
        case 'Clock':
            return node.accept(visitor);
        case 'ClockLeft':
            return node.accept(visitor);
        case 'Entity':
            return node.accept(visitor);
        case 'Parameter':
            return node.accept(visitor);
        case 'VariableStatement':
            return node.accept(visitor);
        case 'VariableAssignation':
            return node.accept(visitor);
        case 'SetSpeed':
            return node.accept(visitor);
        case 'CallFunction':
            return node.accept(visitor);
        case 'Expression':
            return node.accept(visitor);
        case 'UnaryBooleanExpression':
            return node.accept(visitor);
        case 'UnaryArithmeticExpression':
            return node.accept(visitor);
        case 'CallFunctionExpr':
            return node.accept(visitor);
        case 'CallEntity':
            return node.accept(visitor);
        case 'GetSensor':
            return node.accept(visitor);
        case 'Value':
            return node.accept(visitor);
        case 'ArithmeticExpression':
            return node.accept(visitor);
        case 'ArithmeticOperator':
            return node.accept(visitor);
        case 'Add':
            return node.accept(visitor);
        case 'Sub':
            return node.accept(visitor);
        case 'Multiply':
            return node.accept(visitor);
        case 'Divise':
            return node.accept(visitor);
        case 'BooleanExpression':
            return node.accept(visitor);
        case 'BooleanOperator':
            return node.accept(visitor);
        case 'LowerThan':
            return node.accept(visitor);
        case 'EqualTo':
            return node.accept(visitor);
        case 'UpperThan':
            return node.accept(visitor);
        case 'Not':
            return node.accept(visitor);
        case 'Or':
            return node.accept(visitor);
        case 'LowerOrEqualTo':
            return node.accept(visitor);
        case 'UpperOrEqualTo':
            return node.accept(visitor);
        case 'And':
            return node.accept(visitor);
        default:
            throw new Error(`Unknown node type: ${node.$type}`);
    }
}
//# sourceMappingURL=visitor.js.map
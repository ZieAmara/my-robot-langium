/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services) {
    const registry = services.validation.ValidationRegistry;
    const weaver = services.validation.MyRobotAcceptWeaver;
    registry.register(weaver.checks, weaver);
}
export class MyRobotAcceptWeaver {
    constructor() {
        // TODO : Remove lines for abstract concepts
        this.checks = {
            Program: this.weaveProgram,
            Fonction: this.weaveFonction,
            ReturnType: this.weaveReturnType,
            Statement: this.weaveStatement,
            ReturnStatement: this.weaveReturnStatement,
            If: this.weaveIf,
            Loop: this.weaveLoop,
            ControlRobot: this.weaveControlRobot,
            Movement: this.weaveMovement,
            Backward: this.weaveBackward,
            Forward: this.weaveForward,
            Left: this.weaveLeft,
            Right: this.weaveRight,
            Rotate: this.weaveRotate,
            Clock: this.weaveClock,
            ClockLeft: this.weaveClockLeft,
            Entity: this.weaveEntity,
            Parameter: this.weaveParameter,
            VariableStatement: this.weaveVariableStatement,
            VariableAssignation: this.weaveVariableAssignation,
            SetSpeed: this.weaveSetSpeed,
            CallFunction: this.weaveCallFunction,
            Expression: this.weaveExpression,
            UnaryBooleanExpression: this.weaveUnaryBooleanExpression,
            UnaryArithmeticExpression: this.weaveUnaryArithmeticExpression,
            CallFunctionExpr: this.weaveCallFunctionExpr,
            CallEntity: this.weaveCallEntity,
            GetSensor: this.weaveGetSensor,
            Value: this.weaveValue,
            ArithmeticExpression: this.weaveArithmeticExpression,
            ArithmeticOperator: this.weaveArithmeticOperator,
            Add: this.weaveAdd,
            Sub: this.weaveSub,
            Multiply: this.weaveMultiply,
            Divise: this.weaveDivise,
            BooleanExpression: this.weaveBooleanExpression,
            BooleanOperator: this.weaveBooleanOperator,
            LowerThan: this.weaveLowerThan,
            EqualTo: this.weaveEqualTo,
            UpperThan: this.weaveUpperThan,
            Not: this.weaveNot,
            Or: this.weaveOr,
            LowerOrEqualTo: this.weaveLowerOrEqualTo,
            UpperOrEqualTo: this.weaveUpperOrEqualTo,
            And: this.weaveAnd
        };
    }
    weaveProgram(node, accept) {
        node.accept = (visitor) => { return visitor.visitProgram(node); };
    }
    weaveFonction(node, accept) {
        node.accept = (visitor) => { return visitor.visitFonction(node); };
    }
    weaveReturnType(node, accept) {
        node.accept = (visitor) => { return visitor.visitReturnType(node); };
    }
    weaveStatement(node, accept) {
        node.accept = (visitor) => { return visitor.visitStatement(node); };
    }
    weaveReturnStatement(node, accept) {
        node.accept = (visitor) => { return visitor.visitReturnStatement(node); };
    }
    weaveIf(node, accept) {
        node.accept = (visitor) => { return visitor.visitIf(node); };
    }
    weaveLoop(node, accept) {
        node.accept = (visitor) => { return visitor.visitLoop(node); };
    }
    weaveControlRobot(node, accept) {
        node.accept = (visitor) => { return visitor.visitControlRobot(node); };
    }
    weaveMovement(node, accept) {
        node.accept = (visitor) => { return visitor.visitMovement(node); };
    }
    weaveBackward(node, accept) {
        node.accept = (visitor) => { return visitor.visitBackward(node); };
    }
    weaveForward(node, accept) {
        node.accept = (visitor) => { return visitor.visitForward(node); };
    }
    weaveLeft(node, accept) {
        node.accept = (visitor) => { return visitor.visitLeft(node); };
    }
    weaveRight(node, accept) {
        node.accept = (visitor) => { return visitor.visitRight(node); };
    }
    weaveRotate(node, accept) {
        node.accept = (visitor) => { return visitor.visitRotate(node); };
    }
    weaveClock(node, accept) {
        node.accept = (visitor) => { return visitor.visitClock(node); };
    }
    weaveClockLeft(node, accept) {
        node.accept = (visitor) => { return visitor.visitClockLeft(node); };
    }
    weaveEntity(node, accept) {
        node.accept = (visitor) => { return visitor.visitEntity(node); };
    }
    weaveParameter(node, accept) {
        node.accept = (visitor) => { return visitor.visitParameter(node); };
    }
    weaveVariableStatement(node, accept) {
        node.accept = (visitor) => { return visitor.visitVariableStatement(node); };
    }
    weaveVariableAssignation(node, accept) {
        node.accept = (visitor) => { return visitor.visitVariableAssignation(node); };
    }
    weaveSetSpeed(node, accept) {
        node.accept = (visitor) => { return visitor.visitSetSpeed(node); };
    }
    weaveCallFunction(node, accept) {
        node.accept = (visitor) => { return visitor.visitCallFunction(node); };
    }
    weaveExpression(node, accept) {
        node.accept = (visitor) => { return visitor.visitExpression(node); };
    }
    weaveUnaryBooleanExpression(node, accept) {
        node.accept = (visitor) => { return visitor.visitUnaryBooleanExpression(node); };
    }
    weaveUnaryArithmeticExpression(node, accept) {
        node.accept = (visitor) => { return visitor.visitUnaryArithmeticExpression(node); };
    }
    weaveCallFunctionExpr(node, accept) {
        node.accept = (visitor) => { return visitor.visitCallFunctionExpr(node); };
    }
    weaveCallEntity(node, accept) {
        node.accept = (visitor) => { return visitor.visitCallEntity(node); };
    }
    weaveGetSensor(node, accept) {
        node.accept = (visitor) => { return visitor.visitGetSensor(node); };
    }
    weaveValue(node, accept) {
        node.accept = (visitor) => { return visitor.visitValue(node); };
    }
    weaveArithmeticExpression(node, accept) {
        node.accept = (visitor) => { return visitor.visitArithmeticExpression(node); };
    }
    weaveArithmeticOperator(node, accept) {
        node.accept = (visitor) => { return visitor.visitArithmeticOperator(node); };
    }
    weaveAdd(node, accept) {
        node.accept = (visitor) => { return visitor.visitAdd(node); };
    }
    weaveSub(node, accept) {
        node.accept = (visitor) => { return visitor.visitSub(node); };
    }
    weaveMultiply(node, accept) {
        node.accept = (visitor) => { return visitor.visitMultiply(node); };
    }
    weaveDivise(node, accept) {
        node.accept = (visitor) => { return visitor.visitDivise(node); };
    }
    weaveBooleanExpression(node, accept) {
        node.accept = (visitor) => { return visitor.visitBooleanExpression(node); };
    }
    weaveBooleanOperator(node, accept) {
        node.accept = (visitor) => { return visitor.visitBooleanOperator(node); };
    }
    weaveLowerThan(node, accept) {
        node.accept = (visitor) => { return visitor.visitLowerThan(node); };
    }
    weaveEqualTo(node, accept) {
        node.accept = (visitor) => { return visitor.visitEqualTo(node); };
    }
    weaveUpperThan(node, accept) {
        node.accept = (visitor) => { return visitor.visitUpperThan(node); };
    }
    weaveNot(node, accept) {
        node.accept = (visitor) => { return visitor.visitNot(node); };
    }
    weaveOr(node, accept) {
        node.accept = (visitor) => { return visitor.visitOr(node); };
    }
    weaveLowerOrEqualTo(node, accept) {
        node.accept = (visitor) => { return visitor.visitLowerOrEqualTo(node); };
    }
    weaveUpperOrEqualTo(node, accept) {
        node.accept = (visitor) => { return visitor.visitUpperOrEqualTo(node); };
    }
    weaveAnd(node, accept) {
        node.accept = (visitor) => { return visitor.visitAnd(node); };
    }
}
//# sourceMappingURL=accept-weaver.js.map
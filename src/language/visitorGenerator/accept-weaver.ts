
import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MyRobotAstType } from '../generated/ast.js';
import * as InterfaceAST from '../generated/ast.js';
import * as ClassAST from './visitor.js';
import { Visitor } from './visitor.js';
import type { MyRobotServices } from '../my-robot-module.js';

/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: MyRobotServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = services.validation.MyRobotAcceptWeaver
    registry.register(weaver.checks, weaver);
}

export class MyRobotAcceptWeaver {
    
    // TODO : Remove lines for abstract concepts
    checks: ValidationChecks<MyRobotAstType> = {
        Program : this.weaveProgram,
		Fonction : this.weaveFonction,
		ReturnType : this.weaveReturnType,
		Statement : this.weaveStatement,
		ReturnStatement : this.weaveReturnStatement,
		If : this.weaveIf,
		Loop : this.weaveLoop,
		ControlRobot : this.weaveControlRobot,
		Movement : this.weaveMovement,
		Backward : this.weaveBackward,
		Forward : this.weaveForward,
		Left : this.weaveLeft,
		Right : this.weaveRight,
		Rotate : this.weaveRotate,
		Clock : this.weaveClock,
		ClockLeft : this.weaveClockLeft,
		Entity : this.weaveEntity,
		Parameter : this.weaveParameter,
		VariableStatement : this.weaveVariableStatement,
		VariableAssignation : this.weaveVariableAssignation,
		SetSpeed : this.weaveSetSpeed,
		CallFunction : this.weaveCallFunction,
		Expression : this.weaveExpression,
		UnaryBooleanExpression : this.weaveUnaryBooleanExpression,
		UnaryArithmeticExpression : this.weaveUnaryArithmeticExpression,
		CallFunctionExpr : this.weaveCallFunctionExpr,
		CallEntity : this.weaveCallEntity,
		GetSensor : this.weaveGetSensor,
        GetDistance : this.weaveGetDistance,
        GetSpeed : this.weaveGetSpeed,
        GetTimestamp : this.weaveGetTimestamp,
		Value : this.weaveValue,
		ArithmeticExpression : this.weaveArithmeticExpression,
		AddSubExpression : this.weaveAddSubExpression,
		MultiDivExpression : this.weaveMultiDivExpression,
		AddSubOperator : this.weaveAddSubOperator,
		MultiDivOperator : this.weaveMultiDivOperator,
		Add : this.weaveAdd,
		Sub : this.weaveSub,
		Multiply : this.weaveMultiply,
		Divise : this.weaveDivise,
		BooleanExpression : this.weaveBooleanExpression,
		BooleanOperator : this.weaveBooleanOperator,
		LowerThan : this.weaveLowerThan,
		EqualTo : this.weaveEqualTo,
		UpperThan : this.weaveUpperThan,
		Not : this.weaveNot,
		Or : this.weaveOr,
		LowerOrEqualTo : this.weaveLowerOrEqualTo,
		UpperOrEqualTo : this.weaveUpperOrEqualTo,
		And : this.weaveAnd
    };

    
weaveProgram(node : InterfaceAST.Program, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitProgram(node as unknown as ClassAST.Program); }
}

weaveFonction(node : InterfaceAST.Fonction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitFonction(node as unknown as ClassAST.Fonction); }
}

weaveReturnType(node : InterfaceAST.ReturnType, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitReturnType(node as unknown as ClassAST.ReturnType); }
}

weaveStatement(node : InterfaceAST.Statement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitStatement(node as unknown as ClassAST.Statement); }
}

weaveReturnStatement(node : InterfaceAST.ReturnStatement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitReturnStatement(node as unknown as ClassAST.ReturnStatement); }
}

weaveIf(node : InterfaceAST.If, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitIf(node as unknown as ClassAST.If); }
}

weaveLoop(node : InterfaceAST.Loop, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLoop(node as unknown as ClassAST.Loop); }
}

weaveControlRobot(node : InterfaceAST.ControlRobot, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitControlRobot(node as unknown as ClassAST.ControlRobot); }
}

weaveMovement(node : InterfaceAST.Movement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMovement(node as unknown as ClassAST.Movement); }
}

weaveBackward(node : InterfaceAST.Backward, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBackward(node as unknown as ClassAST.Backward); }
}

weaveForward(node : InterfaceAST.Forward, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitForward(node as unknown as ClassAST.Forward); }
}

weaveLeft(node : InterfaceAST.Left, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLeft(node as unknown as ClassAST.Left); }
}

weaveRight(node : InterfaceAST.Right, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitRight(node as unknown as ClassAST.Right); }
}

weaveRotate(node : InterfaceAST.Rotate, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitRotate(node as unknown as ClassAST.Rotate); }
}

weaveClock(node : InterfaceAST.Clock, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitClock(node as unknown as ClassAST.Clock); }
}

weaveClockLeft(node : InterfaceAST.ClockLeft, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitClockLeft(node as unknown as ClassAST.ClockLeft); }
}

weaveEntity(node : InterfaceAST.Entity, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitEntity(node as unknown as ClassAST.Entity); }
}

weaveParameter(node : InterfaceAST.Parameter, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitParameter(node as unknown as ClassAST.Parameter); }
}

weaveVariableStatement(node : InterfaceAST.VariableStatement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitVariableStatement(node as unknown as ClassAST.VariableStatement); }
}

weaveVariableAssignation(node : InterfaceAST.VariableAssignation, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitVariableAssignation(node as unknown as ClassAST.VariableAssignation); }
}

weaveSetSpeed(node : InterfaceAST.SetSpeed, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitSetSpeed(node as unknown as ClassAST.SetSpeed); }
}

weaveCallFunction(node : InterfaceAST.CallFunction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCallFunction(node as unknown as ClassAST.CallFunction); }
}

weaveExpression(node : InterfaceAST.Expression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExpression(node as unknown as ClassAST.Expression); }
}

weaveUnaryBooleanExpression(node : InterfaceAST.UnaryBooleanExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnaryBooleanExpression(node as unknown as ClassAST.UnaryBooleanExpression); }
}

weaveUnaryArithmeticExpression(node : InterfaceAST.UnaryArithmeticExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnaryArithmeticExpression(node as unknown as ClassAST.UnaryArithmeticExpression); }
}

weaveCallFunctionExpr(node : InterfaceAST.CallFunctionExpr, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCallFunctionExpr(node as unknown as ClassAST.CallFunctionExpr); }
}

weaveCallEntity(node : InterfaceAST.CallEntity, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCallEntity(node as unknown as ClassAST.CallEntity); }
}

weaveGetSensor(node : InterfaceAST.GetSensor, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitGetSensor(node as unknown as ClassAST.GetSensor); }
}

weaveGetDistance(node : InterfaceAST.GetDistance, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitGetDistance(node as unknown as ClassAST.GetDistance); }
}

weaveGetSpeed(node : InterfaceAST.GetSpeed, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitGetSpeed(node as unknown as ClassAST.GetSpeed); }
}

weaveGetTimestamp(node : InterfaceAST.GetTimestamp, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitGetTimestamp(node as unknown as ClassAST.GetTimestamp); }
}

weaveValue(node : InterfaceAST.Value, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitValue(node as unknown as ClassAST.Value); }
}

weaveArithmeticExpression(node : InterfaceAST.ArithmeticExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitArithmeticExpression(node as unknown as ClassAST.ArithmeticExpression); }
}

weaveAddSubExpression(node : InterfaceAST.AddSubExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAddSubExpression(node as unknown as ClassAST.AddSubExpression); }
}

weaveMultiDivExpression(node : InterfaceAST.MultiDivExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMultiDivExpression(node as unknown as ClassAST.MultiDivExpression); }
}

weaveAddSubOperator(node : InterfaceAST.AddSubOperator, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAddSubOperator(node as unknown as ClassAST.AddSubOperator); }
}

weaveMultiDivOperator(node : InterfaceAST.MultiDivOperator, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMultiDivOperator(node as unknown as ClassAST.MultiDivOperator); }
}

weaveAdd(node : InterfaceAST.Add, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAdd(node as unknown as ClassAST.Add); }
}

weaveSub(node : InterfaceAST.Sub, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitSub(node as unknown as ClassAST.Sub); }
}

weaveMultiply(node : InterfaceAST.Multiply, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMultiply(node as unknown as ClassAST.Multiply); }
}

weaveDivise(node : InterfaceAST.Divise, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDivise(node as unknown as ClassAST.Divise); }
}

weaveBooleanExpression(node : InterfaceAST.BooleanExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBooleanExpression(node as unknown as ClassAST.BooleanExpression); }
}

weaveBooleanOperator(node : InterfaceAST.BooleanOperator, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBooleanOperator(node as unknown as ClassAST.BooleanOperator); }
}

weaveLowerThan(node : InterfaceAST.LowerThan, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLowerThan(node as unknown as ClassAST.LowerThan); }
}

weaveEqualTo(node : InterfaceAST.EqualTo, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitEqualTo(node as unknown as ClassAST.EqualTo); }
}

weaveUpperThan(node : InterfaceAST.UpperThan, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUpperThan(node as unknown as ClassAST.UpperThan); }
}

weaveNot(node : InterfaceAST.Not, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitNot(node as unknown as ClassAST.Not); }
}

weaveOr(node : InterfaceAST.Or, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitOr(node as unknown as ClassAST.Or); }
}

weaveLowerOrEqualTo(node : InterfaceAST.LowerOrEqualTo, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLowerOrEqualTo(node as unknown as ClassAST.LowerOrEqualTo); }
}

weaveUpperOrEqualTo(node : InterfaceAST.UpperOrEqualTo, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUpperOrEqualTo(node as unknown as ClassAST.UpperOrEqualTo); }
}

weaveAnd(node : InterfaceAST.And, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAnd(node as unknown as ClassAST.And); }
}


}

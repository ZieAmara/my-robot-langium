import { Add, And, ArithmeticExpression, ArithmeticOperator, Backward, BooleanExpression, BooleanOperator, CallEntity, CallFunction, CallFunctionExpr, Clock, ClockLeft, ControlRobot, Divise, Entity, EqualTo, Expression, Fonction, Forward, GetSensor, If, Left, Loop, LowerOrEqualTo, LowerThan, Movement, Multiply, Not, Or, Parameter, Program, ReturnStatement, ReturnType, Right, Rotate, SetSpeed, Statement, Sub, UnaryArithmeticExpression, UnaryBooleanExpression, UpperOrEqualTo, UpperThan, Value, VariableAssignation, VariableStatement } from "../../language/generated/ast.js";
import { Visitor } from "../../language/visitorGenerator/visitor.js";

export class CompilerVisitor implements Visitor {
    
    visitProgram(node : Program) : any {}
	
    visitFonction(node : Fonction) : any {}
	
    visitReturnType(node : ReturnType) : any {}
	
    visitStatement(node : Statement) : any {}
	
    visitReturnStatement(node : ReturnStatement) : any{}
	
    visitIf(node : If) : any {}
	
    visitLoop(node : Loop) : any {}
	
    visitControlRobot(node : ControlRobot) : any {}
	
    visitMovement(node : Movement) : any {}
	
    visitBackward(node : Backward) : any {}
	
    visitForward(node : Forward) : any {}
	
    visitLeft(node : Left) : any {}
	
    visitRight(node : Right) : any {}
	
    visitRotate(node : Rotate) : any {}
	
    visitClock(node : Clock) : any {}
	
    visitClockLeft(node : ClockLeft) : any {}
	
    visitEntity(node : Entity) : any {}
	
    visitParameter(node : Parameter) : any {}
	
    visitVariableStatement(node : VariableStatement) : any {}
	
    visitVariableAssignation(node : VariableAssignation) : any {}
	
    visitSetSpeed(node : SetSpeed) : any {}
	
    visitCallFunction(node : CallFunction) : any {}
	
    visitExpression(node : Expression) : any {}
	
    visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any {}
	
    visitUnaryArithmeticExpression(node : UnaryArithmeticExpression) : any {}
	
    visitCallFunctionExpr(node : CallFunctionExpr) : any {}
	
    visitCallEntity(node : CallEntity) : any {}
	
    visitGetSensor(node : GetSensor) : any {}
	
    visitValue(node : Value) : any {}
	
    visitArithmeticExpression(node : ArithmeticExpression) : any {}
	
    visitArithmeticOperator(node : ArithmeticOperator) : any {}
	
    visitAdd(node : Add) : any {}
	
    visitSub(node : Sub) : any {}
	
    visitMultiply(node : Multiply) : any {}
	
    visitDivise(node : Divise) : any {}
	
    visitBooleanExpression(node : BooleanExpression) : any {}
	
    visitBooleanOperator(node : BooleanOperator) : any {}
	
    visitLowerThan(node : LowerThan) : any {}
	
    visitEqualTo(node : EqualTo) : any {}
	
    visitUpperThan(node : UpperThan) : any {}
	
    visitNot(node : Not) : any {}
	
    visitOr(node : Or) : any {}
	
    visitLowerOrEqualTo(node : LowerOrEqualTo) : any {}
	
    visitUpperOrEqualTo(node : UpperOrEqualTo) : any {}
	
    visitAnd(node : And) : any {}
}
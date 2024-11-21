import { Visitor, Add, ArithmeticExpression, ArithmeticOperator, BooleanExpression, Fonction, If, LowerThan, Program, ReturnType, Sub, UpperThan, Statement, ControlStructure, Loop, ControlRobot, Movement, Backward, Forward, Left, Right, Rotate, Clock, ClockLeft, Entity, Parameter, VariableStatement, VariableAssignation, SetSpeed, CallFunction, Expression, UnaryBooleanExpression, UnaryArithmeticExpression, CallFunctionExpr, CallEntity, GetSensor, Value, Multiply, Divise, BooleanOperator, EqualTo, Not, Or, LowerOrEqualTo, UpperOrEqualTo, And } from '../../language/visitorGenerator/visitor.js';
//import { Visitor } from '../../language/visitorGenerator/visitor.js';
import { Robot as MyRobotEntity } from '../../web/simulator/entities.js';
import { BaseScene, Scene } from '../../web/simulator/scene.js';
import { Vector } from '../../web/simulator/utils.js';

export class MyRobotInterpreter implements Visitor {
    private scene: Scene;
    private robot: MyRobotEntity;

    constructor(
        sceneWidth?: number,
        sceneHeight?: number
    ) {
        if (sceneWidth && sceneHeight) {
            this.scene = new BaseScene(new Vector(sceneWidth*10, sceneHeight*10));
            this.robot = this.scene.robot;
        }
        else {
            this.scene = new BaseScene();
            this.robot = this.scene.robot;
        }      

    }

    visitProgram(node: Program) {
        const entryFonction = node.fonction.find(f => f.name === 'entry');
        if (entryFonction) {
            entryFonction.accept(this);
        }
        return this.scene;
    }

    visitFonction(node: Fonction) {}

    visitReturnType(node: ReturnType) {}

    visitStatement(node: Statement) {}

    visitControlStructure(node: ControlStructure) {}

    visitIf(node: If) {}

    visitLoop(node: Loop) {}

    visitControlRobot(node: ControlRobot) {}

    visitMovement(node: Movement) {}

    visitBackward(node: Backward) {}

    visitForward(node: Forward) {}

    visitLeft(node: Left) {}

    visitRight(node: Right) {}

    visitRotate(node: Rotate) {}

    visitClock(node: Clock) {}

    visitClockLeft(node: ClockLeft) {}

    visitEntity(node: Entity) {}

    visitParameter(node: Parameter) {}

    visitVariableStatement(node: VariableStatement) {}

    visitVariableAssignation(node: VariableAssignation) {}

    visitSetSpeed(node: SetSpeed) {}

    visitCallFunction(node: CallFunction) {}

    visitExpression(node: Expression) {}

    visitUnaryBooleanExpression(node: UnaryBooleanExpression) {}

    visitUnaryArithmeticExpression(node: UnaryArithmeticExpression) {}

    visitCallFunctionExpr(node: CallFunctionExpr) {}

    visitCallEntity(node: CallEntity) {}

    visitGetSensor(node: GetSensor) {}
    
    visitValue(node: Value) {}

    visitArithmeticExpression(node: ArithmeticExpression) {}

    visitArithmeticOperator(node: ArithmeticOperator) {}

    visitAdd(node: Add) {}

    visitSub(node: Sub) {}

    visitMultiply(node: Multiply) {}

    visitDivise(node: Divise) {}

    visitBooleanExpression(node: BooleanExpression) {}

    visitBooleanOperator(node: BooleanOperator) {}

    visitLowerThan(node: LowerThan) {}

    visitEqualTo(node: EqualTo) {}

    visitUpperThan(node: UpperThan) {}

    visitNot(node: Not) {}

    visitOr(node: Or) {}

    visitLowerOrEqualTo(node: LowerOrEqualTo) {}

    visitUpperOrEqualTo(node: UpperOrEqualTo) {}

    visitAnd(node: And) {}

}


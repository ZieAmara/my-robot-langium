
import { 
    Add, ArithmeticExpression, ArithmeticOperator, BooleanExpression, Fonction, If, LowerThan, Program, ReturnType, Sub, UpperThan, Statement, Loop, ControlRobot, Movement, Backward, Forward, Left, Right, Rotate, Clock, ClockLeft, Entity, Parameter, VariableStatement, VariableAssignation, SetSpeed, CallFunction, Expression, UnaryBooleanExpression, UnaryArithmeticExpression, CallFunctionExpr, CallEntity, GetSensor, Value, Multiply, Divise, BooleanOperator, EqualTo, Not, Or, LowerOrEqualTo, UpperOrEqualTo, And, 
    ReturnStatement,
    GetDistance,
    GetSpeed,
    GetTimestamp
} from '../../language/generated/ast.js';
import { Visitor } from '../../language/visitorGenerator/visitor.js';
import { Robot } from '../../web/simulator/entities.js';
import { BaseScene, Scene } from '../../web/simulator/scene.js';
import { Vector } from '../../web/simulator/utils.js';


//A global context to store functions, variables during node traversal.
const globalContext: {
    variables: Record<string, any>;
    functions: Record<string, Function>;
    currentScene: Scene | null;
} = {
    variables: {},
    functions: {},
    currentScene: null
};


export class InterpreterVisitor implements Visitor {
    private scene: Scene;
    robot: Robot;

    constructor(sceneWidth?: number, sceneHeight?: number) {
        // Si des dimensions sont fournies, initialiser la scène avec la taille spécifiée.
        if (sceneWidth && sceneHeight) {
            this.scene = new BaseScene(new Vector(sceneWidth * 10, sceneHeight * 10));
        } else {
            // Par défaut, utiliser la taille de base de la scène.
            this.scene = new BaseScene();
        }
        // Associer le robot à partir de la scène initialisée.
        this.robot = this.scene.robot;
        // Synchroniser avec le contexte global
        globalContext.currentScene = this.scene;
    }

    visitProgram(node: Program): any {
        
        const entryFunction = node.fonction.find(f => f.name === "entry");
        if (!entryFunction) {
            throw new Error("La fonction 'entry' doit être définie.");
        }

        // Exécuter la fonction 'entry'
        return this.visitFonction(entryFunction);
    }
	
    visitFonction(node : Fonction) : any {}
	
    visitReturnType(node : ReturnType) : any {}
	
    visitStatement(node : Statement) : any {}
	
    visitReturnStatement(node : ReturnStatement) : any {}
	
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

    visitGetDistance(node : GetDistance) : any {}
    
    visitGetSpeed(node : GetSpeed) : any {}
    
    visitGetTimestamp(node : GetTimestamp) : any {}
	
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

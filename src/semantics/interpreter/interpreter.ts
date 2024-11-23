
import { 
    Add, ArithmeticExpression, ArithmeticOperator, BooleanExpression, Fonction, If, LowerThan, Program, ReturnType, Sub, UpperThan, Statement, Loop, ControlRobot, Movement, Backward, Forward, Left, Right, Rotate, Clock, ClockLeft, Entity, Parameter, VariableStatement, VariableAssignation, SetSpeed, CallFunction, Expression, UnaryBooleanExpression, UnaryArithmeticExpression, CallFunctionExpr, CallEntity, GetSensor, Value, Multiply, Divise, BooleanOperator, EqualTo, Not, Or, LowerOrEqualTo, UpperOrEqualTo, And, 
    ReturnStatement,
    Type,
    Unit
} from '../../language/generated/ast.js';
import { Visitor, acceptNode } from '../../language/visitorGenerator/visitor.js';
import { Robot } from '../../web/simulator/entities.js';
import { BaseScene, Scene } from '../../web/simulator/scene.js';
import { Vector } from '../../web/simulator/utils.js';


// //A global context to store functions, variables during node traversal.
// const globalContext: {
//     variables: Record<string, any>;
//     functions: Record<string, Function>;
//     currentScene: Scene | null;
// } = {
//     variables: {},
//     functions: {},
//     currentScene: null
// };

interface VariableInfo {
    name: string;
    type: string;
    value: number | boolean | undefined;
}

interface FunctionInfo {
    name: string;
    parameters?: Parameter[];
    returnType: Type | undefined;
}


export class InterpreterVisitor implements Visitor {
    private scene: Scene;
    robot: Robot;

    private variableTable: { [key: string]: VariableInfo } = {};
    private functionTable: { [key: string]: FunctionInfo } = {};

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
        // globalContext.currentScene = this.scene;
    }

    visitProgram(node: Program): any {
        const entryFunction = node.fonction.find(func => func.name === "entry");
        if (entryFunction) {
            acceptNode(entryFunction, this);
        }
        return this.scene;
    }
	
    visitFonction(node : Fonction) : any {
        this.functionTable[node.name] = {
            name: node.name,
            parameters: node.parameter,
            returnType: acceptNode(node.returnType!, this),
        };

        for(const statement of node.body) {
            if(statement.$type === "ReturnStatement") {
                return acceptNode(statement, this);
            }
            acceptNode(statement, this);
        }
        return undefined;
    }
	
    visitReturnType(node : ReturnType) : any {
        return node.returnType;
    }
	
    visitStatement(node : Statement) : any {
        // ----
        return acceptNode(node, this);
    }
	
    visitReturnStatement(node : ReturnStatement) : any {
        return acceptNode(node.returnValue, this);
    }
	
    visitIf(node : If) : any {
        const expression = node.condition;
        const thenBlock = node.thenStatement;
        const elseBlock = node.elseStatement;

        const condition = acceptNode(expression, this);
        if (condition) {
            for(const thenStatement of thenBlock) {
                acceptNode(thenStatement, this)
            }
        } else {
            for(const elseStatement of elseBlock) {
                acceptNode(elseStatement, this);
            }
        }
    }
	
    visitLoop(node : Loop) : any {
        const expression = node.condition;
        const body = node.body;

        while(acceptNode(expression, this)) {
            for(const statement of body) {
                acceptNode(statement, this);
            }
        }
    }
	
    visitControlRobot(node : ControlRobot) : any {
        return acceptNode(node, this);
    }
	
    visitMovement(node : Movement) : any {}
	
    visitBackward(node : Backward) : any {
        const expression = node.distance;
        const distance = acceptNode(expression!, this);
        const distanceInMillimeter = this.toMillimeter(-distance, node.unit)
        this.robot.move(distanceInMillimeter);
    }
	
    visitForward(node : Forward) : any {
        const expression = node.distance;
        const distance = acceptNode(expression!, this);
        const distanceInMillimeter = this.toMillimeter(distance, node.unit)
        this.robot.move(distanceInMillimeter);
    }
	
    visitLeft(node : Left) : any {
        const expression = node.distance;
        const distance = acceptNode(expression!, this);
        const distanceInMillimeter = this.toMillimeter(-distance, node.unit)
        this.robot.side(distanceInMillimeter);
    }
	
    visitRight(node : Right) : any {
        const expression = node.distance;
        const distance = acceptNode(expression!, this);
        const distanceInMillimeter = this.toMillimeter(distance, node.unit)
        this.robot.side(distanceInMillimeter);
    }
	
    visitRotate(node : Rotate) : any {
        const expression = node.angle;
        const angle = acceptNode(expression!, this);
        this.robot.turn(angle);
    }
	
    visitClock(node : Clock) : any {}
	
    visitClockLeft(node : ClockLeft) : any {}
	
    visitEntity(node : Entity) : any {

    }
	
    visitParameter(node : Parameter) : any {}
	
    visitVariableStatement(node : VariableStatement) : any {
        const variableName = node.name;
        const variableType = node.type;
        const variableValue = acceptNode(node.value!, this);

        this.variableTable[variableName] = {
            name: variableName,
            type: variableType,
            value: variableValue
        }
    }
	
    visitVariableAssignation(node : VariableAssignation) : any {
        const value = acceptNode(node.value!, this);
        this.variableTable[node.variable.ref!.name].value = value;
    }
	
    visitSetSpeed(node : SetSpeed) : any {
        const varValue = acceptNode(node.distance, this);
        const distance = typeof varValue === 'boolean' ? (varValue ? 1 : 0) : varValue;
        const distanceInMillimeter = this.toMillimeter(distance, node.unit)
        this.robot.speed = distanceInMillimeter;
    }
	
    visitCallFunction(node : CallFunction) : any {
        const func = node.fonction.ref!;
        
        for(let i=0; i<node.args.length; i++) {
            this.variableTable[func.parameter[i].name] = {
                name: func.parameter[i].name,
                type: func.parameter[i].type,
                value: acceptNode(node.args[i], this)
            };
        }

        return acceptNode(func, this);
    }
	
    visitExpression(node : Expression) : any {
        return acceptNode(node, this);
    }
	
    visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any {}
	
    visitUnaryArithmeticExpression(node : UnaryArithmeticExpression) : any {}
	
    visitCallFunctionExpr(node : CallFunctionExpr) : any {

    }
	
    visitCallEntity(node : CallEntity) : number | boolean | undefined {
        const param = node.entity.ref as Parameter | VariableStatement;
        return this.variableTable[param.name].value;
    }
	
    visitGetSensor(node : GetSensor) : any {

    }
	
    visitValue(node : Value) : any {
        return node.value;
    }
	
    visitArithmeticExpression(node : ArithmeticExpression) : any {}
	
    visitArithmeticOperator(node : ArithmeticOperator) : any {}
	
    visitAdd(node : Add) : any {}
	
    visitSub(node : Sub) : any {}
	
    visitMultiply(node : Multiply) : any {}
	
    visitDivise(node : Divise) : any {}
	
    visitBooleanExpression(node : BooleanExpression) : any {
        // Évaluez le côté gauche de l'expression booléenne
        const leftValue = acceptNode(node.leftCondition!, this);
    
        // Évaluez le côté droit de l'expression booléenne
        const rightValue = acceptNode(node.rightCondition!, this);
    
        // Obtenez l'opérateur booléen
        const operator = node.operator;
    
        // Évaluez l'expression booléenne en fonction de l'opérateur
        if (operator == '==') {
            return leftValue === rightValue;
        } else if (operator === '>') {
            return leftValue > rightValue;
        } else if (operator === '<') {
            return leftValue < rightValue;
        }

        return false;
    }
	
    visitBooleanOperator(node : BooleanOperator) : any {}
	
    visitLowerThan(node : LowerThan) : any {}
	
    visitEqualTo(node : EqualTo) : any {}
	
    visitUpperThan(node : UpperThan) : any {}
	
    visitNot(node : Not) : any {}
	
    visitOr(node : Or) : any {}
	
    visitLowerOrEqualTo(node : LowerOrEqualTo) : any {}
	
    visitUpperOrEqualTo(node : UpperOrEqualTo) : any {}
	
    visitAnd(node : And) : any {}

    private toMillimeter(distance: number, unit: Unit): number {
        switch (unit) {
            case "mm":
                return distance;
            case "cm":
                return distance * 10;
            case "m":
                return distance * 1000;
            default:
                return distance
        }
    }

}

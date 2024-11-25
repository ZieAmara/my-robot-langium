
import { 
    Add, ArithmeticExpression, AddSubExpression, AddSubOperator, MultiDivExpression, MultiDivOperator, BooleanExpression, Fonction, If, LowerThan, Program, ReturnType, Sub, UpperThan, Statement, Loop, ControlRobot, Movement, Backward, Forward, Left, Right, Rotate, Clock, ClockLeft, Entity, Parameter, VariableStatement, VariableAssignation, SetSpeed, CallFunction, Expression, UnaryBooleanExpression, UnaryArithmeticExpression, CallFunctionExpr, CallEntity, GetSensor, Value, Multiply, Divise, BooleanOperator, EqualTo, Not, Or, LowerOrEqualTo, UpperOrEqualTo, And, 
    ReturnStatement,   Type,
   // Unit,
    GetDistance,
    GetSpeed,
    GetTimestamp,
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
   




    ///// 
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

        console.log("DEBUT LOOP");

        let i = 0;
        let oracle = acceptNode(expression, this)
        while(oracle) {
            i++
            console.log(oracle);
            console.log(`LOOP ${i}`);
            for(const statement of body) {
                acceptNode(statement, this);
            }

            oracle = acceptNode(expression, this)
            console.log(oracle);
        }

        console.log(`FIN LOOP ${i}`);
    }
	
    visitControlRobot(node : ControlRobot) : any {
        return acceptNode(node, this);
    }
	
    visitMovement(node : Movement) : any {
        acceptNode(node, this)
    }
	
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
        // acceptNode(node, this)
    }
	
    visitClock(node : Clock) : any {
        const expression = node.angle;
        const angle = acceptNode(expression!, this);
        this.robot.turn(angle);
    }
	
    visitClockLeft(node : ClockLeft) : any {
        const expression = node.angle;
        const angle = acceptNode(expression!, this);
        this.robot.turn(-angle);
    }
	
    visitEntity(node : Entity) : any {
        return acceptNode(node, this)
    }
	
    visitParameter(node : Parameter) : any {
        return acceptNode(node, this)
    }
	
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
        let value = acceptNode(node.value!, this);
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
	
    visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any {
        return acceptNode(node, this);
    }
	
    visitUnaryArithmeticExpression(node : UnaryArithmeticExpression) : any {
        return acceptNode(node, this);
    }
	
    visitCallFunctionExpr(node : CallFunctionExpr) : any {
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
	
    visitCallEntity(node : CallEntity) : number | boolean | undefined {
        const param = node.entity.ref as Parameter | VariableStatement;
        return this.variableTable[param.name].value;
    }
	
    visitGetSensor(node : GetSensor) : any {
        return acceptNode(node, this)
    }

    visitGetDistance(node : GetDistance) : any {
        const poi = this.robot.getRay().intersect(this.scene.entities);
        if (poi) {
            const dist = poi.minus(this.robot.pos).norm();
            console.log(`GET distance = ${dist}`);
            return dist
        }
        console.log(`GET distance = ${9999999999}`);
        return 9999999999;
    }
    
    visitGetSpeed(node : GetSpeed) : any {
        const speed =  this.robot.speed;
        console.log(`GET Speed = ${speed}`);
        return speed;
    }
    
    visitGetTimestamp(node : GetTimestamp) : any {
        const time = this.scene.time;
        console.log(`GET Time = ${time}`);
        return time;
    }
	
    visitValue(node : Value) : any {
        return node.value;
    }
	
    visitArithmeticExpression(node : ArithmeticExpression) : any {
        return acceptNode(node, this);
    }
	
    visitAddSubExpression(node : AddSubExpression) : any {
        const leftValue = acceptNode(node.leftOperand, this);
        const rightValues = node.rightOperand.map(operand => acceptNode(operand, this));
        const operator = node.operator;
        let compt =-1;
        let result = leftValue;

        for (const rightValue of rightValues) {
            compt++
            if (operator[compt].$type === 'Add') {
                result = result + rightValue;
            } else if (operator[compt].$type === 'Sub') {
                result = result - rightValue;
            }
        }
        return result;
    }
    visitMultiDivExpression(node : MultiDivExpression) : any {
        const leftValue = acceptNode(node.leftOperand, this);

        const rightValues = node.rightOperand; 
        const operator = node.operator;
        let compt=-1;

        let result = leftValue;

        for (let rightValue of rightValues) {
            compt++;
            const right=acceptNode(rightValue, this);

            if (operator[compt].$type === 'Multiply') {
                result = result * right;
            } else if (operator[compt].$type === 'Divise') {
                if (right == 0){
                    throw new Error("Impossible de diviser par zéro");
                }
                result = result / right;
            }
        }
        return result;
    }
    visitAddSubOperator(node : AddSubOperator) : any {
        return acceptNode(node, this)
    }
    visitMultiDivOperator(node : MultiDivOperator) : any {
        return acceptNode(node, this)
    }
	
    visitAdd(node : Add) : any {
        return node.symbole
    }
	
    visitSub(node : Sub) : any {
        return node.symbole
    }
	
    visitMultiply(node : Multiply) : any {
        return node.symbole
    }
	
    visitDivise(node : Divise) : any {
        return node.symbole
    }
	
    visitBooleanExpression(node : BooleanExpression) : any {
        // Évaluez le côté gauche de l'expression booléenne
        const leftValue = this.visitUnaryArithmeticExpression(node.leftCondition!)
    
        // Évaluez le côté droit de l'expression booléenne
        const rightValue = this.visitUnaryArithmeticExpression(node.rightCondition!)
    
        // Obtenez l'opérateur booléen
        const operator = this.visitBooleanOperator(node.operator);
    
        // Évaluez l'expression booléenne en fonction de l'opérateur
        if (operator == '==') {
            return leftValue === rightValue;
        } else if (operator === '>') {
            return leftValue > rightValue;
        } else if (operator === '<') {
            return leftValue < rightValue;
        } else if (operator === '<=') {
            return leftValue <= rightValue;
        } else if (operator === '>=') {
            return leftValue >= rightValue;
        }

        return false;
    }
	
    visitBooleanOperator(node : BooleanOperator) : any {
        return acceptNode(node, this)
    }
	
    visitLowerThan(node : LowerThan) : any {
        return node.symbole;
    }
	
    visitEqualTo(node : EqualTo) : any {
        return node.symbole;
    }
	
    visitUpperThan(node : UpperThan) : any {
        return node.symbole;
    }
	
    visitNot(node : Not) : any {
        return node.symbole;
    }
	
    visitOr(node : Or) : any {
        return node.symbole;
    }
	
    visitLowerOrEqualTo(node : LowerOrEqualTo) : any {
        return node.symbole;
    }
	
    visitUpperOrEqualTo(node : UpperOrEqualTo) : any {
        return node.symbole;
    }
	
    visitAnd(node : And) : any {
        return node.symbole;
    }

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

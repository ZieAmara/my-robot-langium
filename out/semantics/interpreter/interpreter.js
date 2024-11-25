import { acceptNode } from '../../language/visitorGenerator/visitor.js';
import { BaseScene } from '../../web/simulator/scene.js';
import { Vector } from '../../web/simulator/utils.js';
export class InterpreterVisitor {
    constructor(sceneWidth, sceneHeight) {
        this.variableTable = {};
        this.functionTable = {};
        // Si des dimensions sont fournies, initialiser la scène avec la taille spécifiée.
        if (sceneWidth && sceneHeight) {
            this.scene = new BaseScene(new Vector(sceneWidth * 10, sceneHeight * 10));
        }
        else {
            // Par défaut, utiliser la taille de base de la scène.
            this.scene = new BaseScene();
        }
        // Associer le robot à partir de la scène initialisée.
        this.robot = this.scene.robot;
        // Synchroniser avec le contexte global
        // globalContext.currentScene = this.scene;
    }
    ///// 
    visitProgram(node) {
        const entryFunction = node.fonction.find(func => func.name === "entry");
        if (entryFunction) {
            acceptNode(entryFunction, this);
        }
        return this.scene;
    }
    visitFonction(node) {
        this.functionTable[node.name] = {
            name: node.name,
            parameters: node.parameter,
            returnType: acceptNode(node.returnType, this),
        };
        for (const statement of node.body) {
            if (statement.$type === "ReturnStatement") {
                return acceptNode(statement, this);
            }
            acceptNode(statement, this);
        }
        return undefined;
    }
    visitReturnType(node) {
        return node.returnType;
    }
    visitStatement(node) {
        // ----
        return acceptNode(node, this);
    }
    visitReturnStatement(node) {
        return acceptNode(node.returnValue, this);
    }
    visitIf(node) {
        const expression = node.condition;
        const thenBlock = node.thenStatement;
        const elseBlock = node.elseStatement;
        const condition = acceptNode(expression, this);
        if (condition) {
            for (const thenStatement of thenBlock) {
                acceptNode(thenStatement, this);
            }
        }
        else {
            for (const elseStatement of elseBlock) {
                acceptNode(elseStatement, this);
            }
        }
    }
    visitLoop(node) {
        const expression = node.condition;
        const body = node.body;
        console.log("DEBUT LOOP");
        let i = 0;
        let oracle = acceptNode(expression, this);
        while (oracle) {
            i++;
            console.log(oracle);
            console.log(`LOOP ${i}`);
            for (const statement of body) {
                acceptNode(statement, this);
            }
            oracle = acceptNode(expression, this);
            console.log(oracle);
        }
        console.log(`FIN LOOP ${i}`);
    }
    visitControlRobot(node) {
        return acceptNode(node, this);
    }
    visitMovement(node) {
        acceptNode(node, this);
    }
    visitBackward(node) {
        const expression = node.distance;
        const distance = acceptNode(expression, this);
        const distanceInMillimeter = this.toMillimeter(-distance, node.unit);
        this.robot.move(distanceInMillimeter);
    }
    visitForward(node) {
        const expression = node.distance;
        const distance = acceptNode(expression, this);
        const distanceInMillimeter = this.toMillimeter(distance, node.unit);
        this.robot.move(distanceInMillimeter);
    }
    visitLeft(node) {
        const expression = node.distance;
        const distance = acceptNode(expression, this);
        const distanceInMillimeter = this.toMillimeter(-distance, node.unit);
        this.robot.side(distanceInMillimeter);
    }
    visitRight(node) {
        const expression = node.distance;
        const distance = acceptNode(expression, this);
        const distanceInMillimeter = this.toMillimeter(distance, node.unit);
        this.robot.side(distanceInMillimeter);
    }
    visitRotate(node) {
        // acceptNode(node, this)
    }
    visitClock(node) {
        const expression = node.angle;
        const angle = acceptNode(expression, this);
        this.robot.turn(angle);
    }
    visitClockLeft(node) {
        const expression = node.angle;
        const angle = acceptNode(expression, this);
        this.robot.turn(-angle);
    }
    visitEntity(node) {
        return acceptNode(node, this);
    }
    visitParameter(node) {
        return acceptNode(node, this);
    }
    visitVariableStatement(node) {
        const variableName = node.name;
        const variableType = node.type;
        const variableValue = acceptNode(node.value, this);
        this.variableTable[variableName] = {
            name: variableName,
            type: variableType,
            value: variableValue
        };
    }
    visitVariableAssignation(node) {
        let value = acceptNode(node.value, this);
        this.variableTable[node.variable.ref.name].value = value;
    }
    visitSetSpeed(node) {
        const varValue = acceptNode(node.distance, this);
        const distance = typeof varValue === 'boolean' ? (varValue ? 1 : 0) : varValue;
        const distanceInMillimeter = this.toMillimeter(distance, node.unit);
        this.robot.speed = distanceInMillimeter;
    }
    visitCallFunction(node) {
        const func = node.fonction.ref;
        for (let i = 0; i < node.args.length; i++) {
            this.variableTable[func.parameter[i].name] = {
                name: func.parameter[i].name,
                type: func.parameter[i].type,
                value: acceptNode(node.args[i], this)
            };
        }
        return acceptNode(func, this);
    }
    visitExpression(node) {
        return acceptNode(node, this);
    }
    visitUnaryBooleanExpression(node) {
        return acceptNode(node, this);
    }
    visitUnaryArithmeticExpression(node) {
        return acceptNode(node, this);
    }
    visitCallFunctionExpr(node) {
        const func = node.fonction.ref;
        for (let i = 0; i < node.args.length; i++) {
            this.variableTable[func.parameter[i].name] = {
                name: func.parameter[i].name,
                type: func.parameter[i].type,
                value: acceptNode(node.args[i], this)
            };
        }
        return acceptNode(func, this);
    }
    visitCallEntity(node) {
        const param = node.entity.ref;
        return this.variableTable[param.name].value;
    }
    visitGetSensor(node) {
        return acceptNode(node, this);
    }
    visitGetDistance(node) {
        const poi = this.robot.getRay().intersect(this.scene.entities);
        if (poi) {
            const dist = poi.minus(this.robot.pos).norm();
            console.log(`GET distance = ${dist}`);
            return dist;
        }
        console.log(`GET distance = ${9999999999}`);
        return 9999999999;
    }
    visitGetSpeed(node) {
        const speed = this.robot.speed;
        console.log(`GET Speed = ${speed}`);
        return speed;
    }
    visitGetTimestamp(node) {
        const time = this.scene.time;
        console.log(`GET Time = ${time}`);
        return time;
    }
    visitValue(node) {
        return node.value;
    }
    visitArithmeticExpression(node) {
        return acceptNode(node, this);
    }
    visitAddSubExpression(node) {
        const leftValue = acceptNode(node.leftOperand, this);
        const rightValues = node.rightOperand.map(operand => acceptNode(operand, this));
        const operator = node.operator;
        let compt = -1;
        let result = leftValue;
        for (const rightValue of rightValues) {
            compt++;
            if (operator[compt].$type === 'Add') {
                result = result + rightValue;
            }
            else if (operator[compt].$type === 'Sub') {
                result = result - rightValue;
            }
        }
        return result;
    }
    visitMultiDivExpression(node) {
        const leftValue = acceptNode(node.leftOperand, this);
        const rightValues = node.rightOperand;
        const operator = node.operator;
        let compt = -1;
        let result = leftValue;
        for (let rightValue of rightValues) {
            compt++;
            const right = acceptNode(rightValue, this);
            if (operator[compt].$type === 'Multiply') {
                result = result * right;
            }
            else if (operator[compt].$type === 'Divise') {
                if (right == 0) {
                    throw new Error("Impossible de diviser par zéro");
                }
                result = result / right;
            }
        }
        return result;
    }
    visitAddSubOperator(node) {
        return acceptNode(node, this);
    }
    visitMultiDivOperator(node) {
        return acceptNode(node, this);
    }
    visitAdd(node) {
        return node.symbole;
    }
    visitSub(node) {
        return node.symbole;
    }
    visitMultiply(node) {
        return node.symbole;
    }
    visitDivise(node) {
        return node.symbole;
    }
    visitBooleanExpression(node) {
        // Évaluez le côté gauche de l'expression booléenne
        const leftValue = this.visitUnaryArithmeticExpression(node.leftCondition);
        // Évaluez le côté droit de l'expression booléenne
        const rightValue = this.visitUnaryArithmeticExpression(node.rightCondition);
        // Obtenez l'opérateur booléen
        const operator = this.visitBooleanOperator(node.operator);
        // Évaluez l'expression booléenne en fonction de l'opérateur
        if (operator == '==') {
            return leftValue === rightValue;
        }
        else if (operator === '>') {
            return leftValue > rightValue;
        }
        else if (operator === '<') {
            return leftValue < rightValue;
        }
        else if (operator === '<=') {
            return leftValue <= rightValue;
        }
        else if (operator === '>=') {
            return leftValue >= rightValue;
        }
        return false;
    }
    visitBooleanOperator(node) {
        return acceptNode(node, this);
    }
    visitLowerThan(node) {
        return node.symbole;
    }
    visitEqualTo(node) {
        return node.symbole;
    }
    visitUpperThan(node) {
        return node.symbole;
    }
    visitNot(node) {
        return node.symbole;
    }
    visitOr(node) {
        return node.symbole;
    }
    visitLowerOrEqualTo(node) {
        return node.symbole;
    }
    visitUpperOrEqualTo(node) {
        return node.symbole;
    }
    visitAnd(node) {
        return node.symbole;
    }
    toMillimeter(distance, unit) {
        switch (unit) {
            case "mm":
                return distance;
            case "cm":
                return distance * 10;
            case "m":
                return distance * 1000;
            default:
                return distance;
        }
    }
}
//# sourceMappingURL=interpreter.js.map
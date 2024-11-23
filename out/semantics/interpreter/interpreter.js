import { BaseScene } from '../../web/simulator/scene.js';
import { Vector } from '../../web/simulator/utils.js';
//A global context to store functions, variables during node traversal.
const globalContext = {
    variables: {},
    functions: {},
    currentScene: null
};
export class InterpreterVisitor {
    constructor(sceneWidth, sceneHeight) {
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
        globalContext.currentScene = this.scene;
    }
    visitProgram(node) {
        const entryFunction = node.fonction.find(f => f.name === "entry");
        if (!entryFunction) {
            throw new Error("La fonction 'entry' doit être définie.");
        }
        // Exécuter la fonction 'entry'
        return this.visitFonction(entryFunction);
    }
    visitFonction(node) { }
    visitReturnType(node) { }
    visitStatement(node) { }
    visitReturnStatement(node) { }
    visitIf(node) { }
    visitLoop(node) { }
    visitControlRobot(node) { }
    visitMovement(node) { }
    visitBackward(node) { }
    visitForward(node) { }
    visitLeft(node) { }
    visitRight(node) { }
    visitRotate(node) { }
    visitClock(node) { }
    visitClockLeft(node) { }
    visitEntity(node) { }
    visitParameter(node) { }
    visitVariableStatement(node) { }
    visitVariableAssignation(node) { }
    visitSetSpeed(node) { }
    visitCallFunction(node) { }
    visitExpression(node) { }
    visitUnaryBooleanExpression(node) { }
    visitUnaryArithmeticExpression(node) { }
    visitCallFunctionExpr(node) { }
    visitCallEntity(node) { }
    visitGetSensor(node) { }
    visitGetDistance(node) { }
    visitGetSpeed(node) { }
    visitGetTimestamp(node) { }
    visitValue(node) { }
    visitArithmeticExpression(node) { }
    visitArithmeticOperator(node) { }
    visitAdd(node) { }
    visitSub(node) { }
    visitMultiply(node) { }
    visitDivise(node) { }
    visitBooleanExpression(node) { }
    visitBooleanOperator(node) { }
    visitLowerThan(node) { }
    visitEqualTo(node) { }
    visitUpperThan(node) { }
    visitNot(node) { }
    visitOr(node) { }
    visitLowerOrEqualTo(node) { }
    visitUpperOrEqualTo(node) { }
    visitAnd(node) { }
}
//# sourceMappingURL=interpreter.js.map
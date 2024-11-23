
import { 
    Add, ArithmeticExpression, ArithmeticOperator, BooleanExpression, Fonction, If, LowerThan, Program, ReturnType, Sub, UpperThan, Statement, Loop, ControlRobot, Movement, Backward, Forward, Left, Right, Rotate, Clock, ClockLeft, Entity, Parameter, VariableStatement, VariableAssignation, SetSpeed, CallFunction, Expression, UnaryBooleanExpression, UnaryArithmeticExpression, CallFunctionExpr, CallEntity, GetSensor, Value, Multiply, Divise, BooleanOperator, EqualTo, Not, Or, LowerOrEqualTo, UpperOrEqualTo, And, 
    ReturnStatement
} from '../../language/generated/ast.js';
import { acceptNode, Visitor } from '../../language/visitorGenerator/visitor.js';
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

    visitFonction(node: Fonction): any {
        // Vérifier que la fonction a un corps défini
        if (!node.body || node.body.length === 0) {
            throw new Error(`La fonction '${node.name}' n'a pas de corps défini.`);
        }

        console.log(`Exécution de la fonction : ${node.name}`);

        // Sauvegarder l'ancien contexte des variables locales
        const previousVariables = { ...globalContext.variables };

        // Exécuter chaque déclaration dans le corps de la fonction
        for (const statement of node.body) {
            acceptNode(statement, this);
        }

        // Restaurer les variables locales après l'exécution
        globalContext.variables = previousVariables;

        console.log(`Fin de l'exécution de la fonction : ${node.name}`);
    }

    visitReturnType(node: ReturnType): any {
        // Vérifie si le type attendu est défini
        if (!node.returnType) {
            throw new Error(`Le type de retour attendu pour la fonction n'est pas défini.`);
        }

        // Évalue la valeur retournée
        // const returnValue = acceptNode(node.value, this);
        const returnValue = acceptNode(node, this);

        // Vérifie si le type correspond au type attendu
        if (typeof returnValue !== node.returnType) {
            throw new Error(
                `Type de retour incorrect : attendu '${node.returnType}', obtenu '${typeof returnValue}'.`
            );
        }

        console.log(`Type de retour valide : '${node.returnType}'.`);
        return returnValue;
    }

    visitStatement(node: Statement): any {}

    visitReturnStatement(node: ReturnStatement) {
        
    }

    visitIf(node: If): any {
        // Si la condition est un tableau, traiter chaque élément
        if (Array.isArray(node.condition)) {
            node.condition.forEach(conditionNode => {
                const conditionResult = acceptNode(conditionNode, this);
                if (typeof conditionResult !== 'boolean') {
                    throw new Error("Chaque condition doit être une expression booléenne.");
                }
            });
        } else {
            // Sinon, traiter la condition comme un seul nœud
            const condition = acceptNode(node.condition, this);

            if (typeof condition !== 'boolean') {
                throw new Error("La condition de l'instruction 'if' doit être une expression booléenne.");
            }

            // Exécuter la branche true ou false en fonction de la condition
            if (condition) {
                for (const statement of node.thenStatement) {
                    acceptNode(statement, this);
                }
            } else if (node.elseStatement) {
                for (const statement of node.elseStatement) {
                    acceptNode(statement, this);
                }
            }
        }
    }

    visitLoop(node: Loop): any {
        // Si la condition est un tableau, traiter chaque élément pour évaluer le résultat final
        let conditionResult = false;
    
        if (Array.isArray(node.condition)) {
            node.condition.forEach(conditionNode => {
                const result = acceptNode(conditionNode, this);
                if (typeof result !== 'boolean') {
                    throw new Error("Chaque condition dans la boucle doit être une expression booléenne.");
                }
                // Combiner les résultats si nécessaire (par exemple, AND logique)
                conditionResult = conditionResult || result; // Peut être ajusté selon la logique
            });
        } else {
            conditionResult = acceptNode(node.condition, this);
    
            if (typeof conditionResult !== 'boolean') {
                throw new Error("La condition de la boucle doit être une expression booléenne.");
            }
        }
    
        // Exécuter la boucle tant que la condition est vraie
        while (conditionResult) {
            for (const statement of node.body) {
                acceptNode(statement, this);
            }
    
            // Réévaluer la condition après chaque itération
            if (Array.isArray(node.condition)) {
                conditionResult = false;
                node.condition.forEach(conditionNode => {
                    const result = acceptNode(conditionNode, this);
                    if (typeof result !== 'boolean') {
                        throw new Error("Chaque condition dans la boucle doit être une expression booléenne.");
                    }
                    conditionResult = conditionResult || result; // Peut être ajusté selon la logique
                });
            } else {
                conditionResult = acceptNode(node.condition, this);
    
                if (typeof conditionResult !== 'boolean') {
                    throw new Error("La condition de la boucle doit être une expression booléenne.");
                }
            }
        }
    }

    visitControlRobot(node: ControlRobot): any {}

    visitMovement(node: Movement): any {
        const robot = globalContext.currentScene?.robot;
        if (!robot) throw new Error("Aucun robot trouvé pour effectuer le mouvement.");
        if (node.distance) robot.move(acceptNode(node.distance, this));
    }

    visitBackward(node: Backward): any {
        const robot = globalContext.currentScene?.robot;
        if (!robot) throw new Error("Aucun robot trouvé pour effectuer le mouvement arrière.");
        if (node.distance) robot.move(acceptNode(node.distance, this));
    }

    visitForward(node: Forward): any {
        this.visitMovement(node);
    }

    visitLeft(node: Left): any {
        const robot = globalContext.currentScene?.robot;
        if (!robot) throw new Error("Aucun robot rencontré pour effectuer le mouvement gauche.");
        if (node.distance) robot.side(-acceptNode(node.distance, this));
    }

    visitRight(node: Right): any {
        const robot = globalContext.currentScene?.robot;
        if (!robot) throw new Error("Aucun robot rencontré pour effectuer le mouvement droit.");
        if (node.distance) robot.side(acceptNode(node.distance, this));
    }

    visitRotate(node: Rotate): any {}

    visitClock(node: Clock): any {}

    visitClockLeft(node: ClockLeft): any {}

    visitEntity(node: Entity): any {}

    visitParameter(node: Parameter): any {}

    visitVariableStatement(node: VariableStatement): any {}

    visitVariableAssignation(node: VariableAssignation): any {}

    visitSetSpeed(node: SetSpeed): any {}

    visitCallFunction(node: CallFunction): any {}

    visitExpression(node: Expression): any {}

    visitUnaryBooleanExpression(node: UnaryBooleanExpression): any {}

    visitUnaryArithmeticExpression(node: UnaryArithmeticExpression): any {}

    visitCallFunctionExpr(node: CallFunctionExpr): any {}

    visitCallEntity(node: CallEntity): any {}

    visitGetSensor(node: GetSensor): any {}
    
    visitValue(node: Value): any {}

    visitArithmeticExpression(node: ArithmeticExpression): any {}

    visitArithmeticOperator(node: ArithmeticOperator): any {}

    visitAdd(node: Add): any {}

    visitSub(node: Sub): any {}

    visitMultiply(node: Multiply): any {}

    visitDivise(node: Divise): any {}

    visitBooleanExpression(node: BooleanExpression): any {}

    visitBooleanOperator(node: BooleanOperator): any {}

    visitLowerThan(node: LowerThan): any {}

    visitEqualTo(node: EqualTo): any {}

    visitUpperThan(node: UpperThan): any {}

    visitNot(node: Not): any {}

    visitOr(node: Or): any {}

    visitLowerOrEqualTo(node: LowerOrEqualTo): any {}

    visitUpperOrEqualTo(node: UpperOrEqualTo): any {}

    visitAnd(node: And): any {}

}

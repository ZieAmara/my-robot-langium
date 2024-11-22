import { acceptNode } from '../../language/visitorGenerator/visitor.js';
import { Timestamp } from '../../web/simulator/entities.js';
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
        // Vérification de l'existence de fonctions dans le programme
        if (!node.fonction || node.fonction.length === 0) {
            throw new Error("Le programme doit contenir au moins une fonction.");
        }
        // Recherche de la fonction 'entry' pour démarrer l'exécution
        const entryFonction = node.fonction.find(f => f.name === 'entry');
        if (!entryFonction) {
            throw new Error("Une fonction nommée 'entry' doit être définie dans le programme.");
        }
        // Initialisation ou configuration spécifique si nécessaire
        console.log("Initialisation du programme...");
        // Exécution de la fonction 'entry'
        acceptNode(entryFonction, this);
        // Ajouter un horodatage final
        if (globalContext.currentScene) {
            globalContext.currentScene.timestamps.push(new Timestamp(globalContext.currentScene.time, globalContext.currentScene.robot));
        }
        else {
            throw new Error("Aucune scène active pour ajouter un horodatage.");
        }
    }
    visitFonction(node) {
        // Vérifier que la fonction a un corps défini
        if (!node.body || node.body.length === 0) {
            throw new Error(`La fonction '${node.name}' n'a pas de corps défini.`);
        }
        console.log(`Exécution de la fonction : ${node.name}`);
        // Sauvegarder l'ancien contexte des variables locales
        const previousVariables = Object.assign({}, globalContext.variables);
        // Exécuter chaque déclaration dans le corps de la fonction
        for (const statement of node.body) {
            acceptNode(statement, this);
        }
        // Restaurer les variables locales après l'exécution
        globalContext.variables = previousVariables;
        console.log(`Fin de l'exécution de la fonction : ${node.name}`);
    }
    visitReturnType(node) {
        // Vérifie si le type attendu est défini
        if (!node.returnType) {
            throw new Error(`Le type de retour attendu pour la fonction n'est pas défini.`);
        }
        // Évalue la valeur retournée
        // const returnValue = acceptNode(node.value, this);
        const returnValue = acceptNode(node, this);
        // Vérifie si le type correspond au type attendu
        if (typeof returnValue !== node.returnType) {
            throw new Error(`Type de retour incorrect : attendu '${node.returnType}', obtenu '${typeof returnValue}'.`);
        }
        console.log(`Type de retour valide : '${node.returnType}'.`);
        return returnValue;
    }
    visitStatement(node) { }
    visitReturnStatement(node) {
    }
    visitIf(node) {
        // Si la condition est un tableau, traiter chaque élément
        if (Array.isArray(node.condition)) {
            node.condition.forEach(conditionNode => {
                const conditionResult = acceptNode(conditionNode, this);
                if (typeof conditionResult !== 'boolean') {
                    throw new Error("Chaque condition doit être une expression booléenne.");
                }
            });
        }
        else {
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
            }
            else if (node.elseStatement) {
                for (const statement of node.elseStatement) {
                    acceptNode(statement, this);
                }
            }
        }
    }
    visitLoop(node) {
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
        }
        else {
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
            }
            else {
                conditionResult = acceptNode(node.condition, this);
                if (typeof conditionResult !== 'boolean') {
                    throw new Error("La condition de la boucle doit être une expression booléenne.");
                }
            }
        }
    }
    visitControlRobot(node) { }
    visitMovement(node) {
        var _a;
        const robot = (_a = globalContext.currentScene) === null || _a === void 0 ? void 0 : _a.robot;
        if (!robot)
            throw new Error("Aucun robot trouvé pour effectuer le mouvement.");
        if (node.distance)
            robot.move(acceptNode(node.distance, this));
    }
    visitBackward(node) {
        var _a;
        const robot = (_a = globalContext.currentScene) === null || _a === void 0 ? void 0 : _a.robot;
        if (!robot)
            throw new Error("Aucun robot trouvé pour effectuer le mouvement arrière.");
        if (node.distance)
            robot.move(acceptNode(node.distance, this));
    }
    visitForward(node) {
        this.visitMovement(node);
    }
    visitLeft(node) {
        var _a;
        const robot = (_a = globalContext.currentScene) === null || _a === void 0 ? void 0 : _a.robot;
        if (!robot)
            throw new Error("Aucun robot rencontré pour effectuer le mouvement gauche.");
        if (node.distance)
            robot.side(-acceptNode(node.distance, this));
    }
    visitRight(node) {
        var _a;
        const robot = (_a = globalContext.currentScene) === null || _a === void 0 ? void 0 : _a.robot;
        if (!robot)
            throw new Error("Aucun robot rencontré pour effectuer le mouvement droit.");
        if (node.distance)
            robot.side(acceptNode(node.distance, this));
    }
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
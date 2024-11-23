import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { If, Loop, MyRobotAstType, Program, Value, VariableStatement } from './generated/ast.js';
import type { MyRobotServices } from './my-robot-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MyRobotServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MyRobotValidator;
    const checks: ValidationChecks<MyRobotAstType> = {
        Program: [
            validator.checkUniqueFonctionDefs, 
            validator.checkUniqueVariableDeclarations,
            validator.checkUniqueFonctionReturnStatements
        ],
        If: [
            validator.checkUniqueControlStructureReturnStatements
        ],
        Loop: [
            validator.checkUniqueControlStructureReturnStatements
        ],
        Value: [
            validator.checkValueAsNumber
        ]
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MyRobotValidator {

    checkValueAsNumber(exp: Value, accept: ValidationAcceptor): void {
        accept('info', `Value = ${exp.value} `, {node: exp, property: 'value'});
    }

    checkUniqueFonctionDefs(program: Program, accept: ValidationAcceptor): void {
        // create a set of visited functions
        // and report an error when we see one we've already seen
        const reported = new Set();
        program.fonction.forEach(f => {
            if (reported.has(f.name)) {
                accept('error',  `Function has non-unique name '${f.name}'.`,  {node: f, property: 'name'});
            }
            reported.add(f.name);
        });
    }

    checkUniqueVariableDeclarations(program: Program, accept: ValidationAcceptor): void {
        // create a set of visited functions
        // and report an error when we see one we've already seen
        program.fonction.forEach(f => {
            const reported = new Set();
            f.body.forEach(body => {
                if (body.$type === 'VariableStatement') {
                    var variable = body as VariableStatement;
                    if (reported.has(variable.name)) {
                        accept('error',  `Variable has non-unique name '${variable.name}'.`,  {node: variable, property: 'name'});
                    }
                    reported.add(variable.name);
                }
            });
        });
    }

    checkUniqueFonctionReturnStatements(program: Program, accept: ValidationAcceptor): void {
        let returnCount = 0;
        program.fonction.forEach(f => {
            f.body.forEach(body => {
                if (body.$type === 'ReturnStatement') {
                    returnCount++;
                    if (returnCount > 1) {
                        accept('error', `Function '${f.name}' has multiple return statements in one block.`, {node: body});
                    }
                }
            });
        });
    }

    checkUniqueControlStructureReturnStatements(controlStructure: If | Loop, accept: ValidationAcceptor): void {
        let returnCount = 0;
        if (controlStructure.$type === 'If') {
            controlStructure.thenStatement.forEach(body => {
                if (body.$type === 'ReturnStatement') {
                    returnCount++;
                    if (returnCount > 1) {
                        accept('error', `If statement has multiple return statements in one block.`, {node: body});
                    }
                }
            })
            if (controlStructure.elseStatement) {
                controlStructure.elseStatement.forEach(body => {
                    if (body.$type === 'ReturnStatement') {
                        returnCount++;
                        if (returnCount > 1) {
                            accept('error', `Else statement has multiple return statements in one block.`, {node: body});
                        }
                    }
                })
            }
        }
        else if (controlStructure.$type === 'Loop') {
            controlStructure.body.forEach(body => {
                if (body.$type === 'ReturnStatement') {
                    returnCount++;
                    if (returnCount > 1) {
                        accept('error', `Loop statement has multiple return statements in one block.`, {node: body});
                    }
                }
            })
        }
    }
    
}

import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MyRobotAstType, Program, VariableStatement } from './generated/ast.js';
import type { MyRobotServices } from './my-robot-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MyRobotServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MyRobotValidator;
    const checks: ValidationChecks<MyRobotAstType> = {
        Program: [
            validator.checkUniqueFunctionDefs, 
            validator.checkUniqueVariableDeclarations
        ]
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MyRobotValidator {

    checkUniqueFunctionDefs(program: Program, accept: ValidationAcceptor): void {
        // create a set of visited functions
        // and report an error when we see one we've already seen
        const reported = new Set();
        program.function.forEach(f => {
            if (reported.has(f.name)) {
                accept('error',  `Function has non-unique name '${f.name}'.`,  {node: f, property: 'name'});
            }
            reported.add(f.name);
        });
    }

    checkUniqueVariableDeclarations(program: Program, accept: ValidationAcceptor): void {
        // create a set of visited functions
        // and report an error when we see one we've already seen
        program.function.forEach(f => {
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

}

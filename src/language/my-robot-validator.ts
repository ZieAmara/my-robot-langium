import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MyRobotAstType, Program } from './generated/ast.js';
import type { MyRobotServices } from './my-robot-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MyRobotServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MyRobotValidator;
    const checks: ValidationChecks<MyRobotAstType> = {
        Program: validator.checkProgramStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MyRobotValidator {

    checkProgramStartsWithCapital(Program: Program, accept: ValidationAcceptor): void {
        if (Program.name) {
            const firstChar = Program.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Program name should start with a capital.', { node: Program, property: 'name' });
            }
        }
    }

}

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MyRobotValidator;
    const checks = {
        Program: validator.checkProgramStartsWithCapital
    };
    registry.register(checks, validator);
}
/**
 * Implementation of custom validations.
 */
export class MyRobotValidator {
    checkProgramStartsWithCapital(Program, accept) {
        if (Program.name) {
            const firstChar = Program.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Program name should start with a capital.', { node: Program, property: 'name' });
            }
        }
    }
}
//# sourceMappingURL=my-robot-validator.js.map
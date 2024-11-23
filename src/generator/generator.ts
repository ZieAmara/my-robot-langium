//import { RobotDslCompilerImpl } from '../language/semantics/compiler/compiler.js';
import { Program } from '../language/visitorGenerator/visitor.js';
import { InterpreterVisitor } from '../semantics/interpreter/interpreter.js';

/**
 * Generates scene from a RobotDsl Model
 * @param robot Model to generate commmands from
 * @returns Generated scene that captures the program's intent
 */
export function generateCommands(robot: Program, sceneWidth?: number, sceneHeight?:number): Object[] {
    const visitor = new InterpreterVisitor(sceneWidth, sceneHeight);
    return robot.accept(visitor)
}

// /**
//  * Generates Arduino code from a RobotDsl Model
//  * @param robot Model to generate Arduino code from
//  * @returns Generated Arduino code that captures the program's intent
//  */
// export function generateArduinoCode(robot: Program): String {
//     const visitor = new RobotDslCompilerImpl();
//     return robot.accept(visitor)
// }
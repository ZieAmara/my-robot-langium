import chalk from 'chalk';
import { Command } from 'commander';
import { MyRobotLanguageMetaData } from '../language/generated/module.js';
import { createMyRobotServices } from '../language/my-robot-module.js';
import { extractAstNode } from './cli-util.js';
import { generate } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import { CompilerVisitor } from '../semantics/compiler/compiler.js';
import { Program } from '../language/visitorGenerator/visitor.js';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const program = await extractAstNode<Program>(fileName, services);
    const generatedFilePath = generate(program);
    console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};

export const compileAction = async (fileName: string): Promise<void> => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const program = await extractAstNode<Program>(fileName, services);
    const compilerVisitor = new CompilerVisitor();
    console.log(program.accept(compilerVisitor));
};


export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version("0.0.1");

    const fileExtensions = MyRobotLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);

    // node ./bin/cli compile <.rob filePath>
    program
        .command('compile')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(compileAction);

    program.parse(process.argv);
}

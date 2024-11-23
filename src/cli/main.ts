import { Command } from 'commander';
import chalk from 'chalk';
import { MyRobotLanguageMetaData } from '../language/generated/module.js';
import { createMyRobotServices } from '../language/my-robot-module.js';
import { extractAstNode, extractDocument } from './cli-util.js';
import { NodeFileSystem } from 'langium/node';
import { CompilerVisitor } from '../semantics/compiler/compiler.js';
import { Program } from '../language/visitorGenerator/visitor.js';
import { generateCommands } from '../generator/generator.js';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');


export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const model = await extractAstNode<Program>(fileName, services);
    // serialize & output the model ast
    const serializedAst = services.serializer.JsonSerializer.serialize(model, { sourceText: true, textRegions: true });
    console.log(serializedAst);
};

export const compileAction = async (fileName: string): Promise<void> => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const program = await extractAstNode<Program>(fileName, services);
    const compilerVisitor = new CompilerVisitor();
    console.log(program.accept(compilerVisitor));
};

export const generateCmds = async (fileName: string): Promise<void> => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const model = await extractAstNode<Program>(fileName, services);
    // directly output these commands to the console
    console.log(JSON.stringify(generateCommands(model)));
};

export const parseAndValidate = async (fileName: any) => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const document = await extractDocument(fileName, services);
    const parseResult = document.parseResult;
    if (parseResult.lexerErrors.length === 0 &&
        parseResult.parserErrors.length === 0) {
        console.log(chalk.green(`Parsed and validated ${fileName} successfully!`));
    }
    else {
        console.log(chalk.red(`Failed to parse and validate ${fileName}!`));
    }
};


export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();
    console.log("SRC/CLI/");
    

    program.version(JSON.parse(packageContent).version);

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

    program
        .command('parseAndValidate')
        .argument('<file>', `Source file to parse & validate (ending in ${fileExtensions})`)
        .description('Indicates where a program parses & validates successfully, but produces no output code')
        .action(parseAndValidate);


    program
        .command('generate-cmds')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('Generates Robot movement commands, suitable for consumption by a simple stack-based drawing machine')
        .action(generateCmds);

    program.parse(process.argv);
}

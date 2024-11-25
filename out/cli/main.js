import { Command } from 'commander';
import chalk from 'chalk';
import { MyRobotLanguageMetaData } from '../language/generated/module.js';
import { createMyRobotServices } from '../language/my-robot-module.js';
import { extractAstNode, extractDocument } from './cli-util.js';
import { NodeFileSystem } from 'langium/node';
import { CompilerVisitor } from '../semantics/compiler/compiler.js';
import { generateCommands } from '../generator/generator.js';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');
export const generateAction = async (fileName, opts) => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const model = await extractAstNode(fileName, services);
    // serialize & output the model ast
    const serializedAst = services.serializer.JsonSerializer.serialize(model, { sourceText: true, textRegions: true });
    console.log(serializedAst);
};
export const compileAction = async (fileName) => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const program = await extractAstNode(fileName, services);
    const compilerVisitor = new CompilerVisitor();
    console.log(program.accept(compilerVisitor));
};
export const generateCmds = async (fileName) => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const model = await extractAstNode(fileName, services);
    // directly output these commands to the console
    console.log(JSON.stringify(generateCommands(model)));
};
export const parseAndValidate = async (fileName) => {
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
// La fonction pour la génération du fichier .ino
export const generateArduinoFile = async (fileName, outputDir) => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const program = await extractAstNode(fileName, services);
    const compilerVisitor = new CompilerVisitor();
    const generatedCode = program.accept(compilerVisitor);
    // Définir le nom du fichier .ino
    const baseName = path.basename(fileName, path.extname(fileName)); // Nom de base du fichier sans extension
    const inoFileName = `${baseName}.ino`;
    // Définir le chemin de sortie
    const outputPath = outputDir ? path.resolve(outputDir, inoFileName) : path.resolve(process.cwd(), inoFileName);
    // Écrire le code dans le fichier .ino
    await fs.writeFile(outputPath, generatedCode, 'utf-8');
    console.log(chalk.green(`Arduino code successfully written to: ${outputPath}`));
};
export default function () {
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
    // node ./bin/cli generate-ino <.rob filePath> --output ./arduino 
    // Lorsque le --output n'est pas spécifié, le fichier .ino est créé dans le rópertoire courant
    // Aussi, il faut s'assurer que le chier de sortie existe bien, sinon une erreur est affichée
    program
        .command('generate-ino')
        .argument('<file>', 'Source file to compile into Arduino .ino code')
        .option('-o, --output <dir>', 'Output directory for the .ino file')
        .description('Generates an Arduino .ino file from the provided source file')
        .action(async (file, options) => {
        try {
            await generateArduinoFile(file, options.output);
        }
        catch (error) {
            console.error(chalk.red(`Failed to generate .ino file: ${error.message}`));
        }
    });
    program.parse(process.argv);
}
//# sourceMappingURL=main.js.map
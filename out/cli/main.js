import chalk from 'chalk';
import { Command } from 'commander';
import { MyRobotLanguageMetaData } from '../language/generated/module.js';
import { createMyRobotServices } from '../language/my-robot-module.js';
import { extractAstNode } from './cli-util.js';
import { generate } from './generator.js';
import { NodeFileSystem } from 'langium/node';
export const generateAction = async (fileName, opts) => {
    const services = createMyRobotServices(NodeFileSystem).MyRobot;
    const program = await extractAstNode(fileName, services);
    const generatedFilePath = generate(program);
    console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};
export default function () {
    const program = new Command();
    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);
    const fileExtensions = MyRobotLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);
    program.parse(process.argv);
}
//# sourceMappingURL=main.js.map
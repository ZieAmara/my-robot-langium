import type { Program } from '../language/generated/ast.js';
//import * as fs from 'node:fs';
//import { CompositeGeneratorNode, NL, toString } from 'langium';
//import * as path from 'node:path';
//import { extractDestinationAndName } from './cli-util.js';


export function generate(program: Program): string {
    const length = program.function;
    return length.toString();
}

/*
export function generateJavaScript(program: Program, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);
    //program.greetings.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.person.ref?.name}!');`, NL));

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, toString(fileNode));
    return generatedFilePath;
} */

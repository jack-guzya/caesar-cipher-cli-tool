import program from 'commander';
import path from 'path';
import { pipeline } from 'stream';
import fs from 'fs';
import { prompt } from 'inquirer';
import Cipher, { TAction } from './Cipher';

type TOptions = {
  action: TAction;
  shift: string;
  input: string;
  output: string;
};

program.storeOptionsAsProperties(false);

program.version('1.0.0').description('Caesar cipher cli tool');

program
  .option('-a, --action <action>', 'select Encode / Decode action')
  .option('-s, --shift <count>', 'shift letters')
  .option('-i, --input <path>', 'path of an input file')
  .option('-o, --output <path>', 'path of an output file');

program.parse(process.argv);

const options = program.opts() as TOptions;

const cipher = new Cipher(options.action, +options.shift);
const inputPath = path.join(__dirname, options.input);
const outputPath = path.join(__dirname, options.output);

console.log(options);

pipeline(
  fs.createReadStream(inputPath),
  cipher,
  fs.createWriteStream(outputPath),
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${options.action} succeeded!`);
    }
  }
);

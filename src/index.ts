/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import program from 'commander';
import path from 'path';
import {
  Transform,
  pipeline,
  TransformCallback,
  TransformOptions,
} from 'stream';
import fs from 'fs';
import { prompt } from 'inquirer';

import actions from './actions';

program.storeOptionsAsProperties(false);

program.version('1.0.0').description('Caesar cipher cli tool');

program
  .option('-a, --action <action>', 'select Encode / Decode action')
  .option('-s, --shift <count>', 'shift letters')
  .option('-i, --input <path>', 'path of an input file')
  .option('-o, --output <path>', 'path of an output file');

program.parse(process.argv);

type TAction = 'encode' | 'decode';

type TOptions = {
  action: 'encode' | 'decode';
  shift: string;
  input: string;
  output: string;
};

const options = program.opts() as TOptions;

class Cipher extends Transform {
  constructor(
    private action: TAction,
    private shift: number,
    opt?: TransformOptions
  ) {
    super(opt);

    this.action = action;
    this.shift = shift;
  }

  _transform(chunk: any, encode: BufferEncoding, callback: TransformCallback) {
    try {
      if (options.action !== 'encode' && options.action !== 'decode') {
        throw Error('Incorrect action parameter');
      }

      const action = this.action === 'encode' ? actions.encode : actions.decode;
      callback(null, action(chunk.toString('utf8'), this.shift));
    } catch (err) {
      callback(err);
    }
  }
}

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

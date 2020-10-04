/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
import path from 'path';
import { pipeline } from 'stream';
import fs from 'fs';
import chalk from 'chalk';
import Cipher from './Cipher';
import initCli from './cli';

const options = initCli();
const cipher = new Cipher(options.action, +options.shift);

const checkFileAccess = (filePath: string) => {
  try {
    fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
  } catch {
    throw Error(`Missing read/write access: ${filePath}`);
  }
};

const inputStream = () => {
  if (!options.input) {
    return process.stdin;
  }

  const inputPath = path.resolve(__dirname, options.input);
  const exists = fs.existsSync(inputPath);
  checkFileAccess(inputPath);

  if (!exists) {
    throw Error(`Invalid input file path: ${inputPath}`);
  }

  return fs.createReadStream(inputPath);
};

const outputStream = () => {
  if (!options.output) {
    return process.stdout;
  }

  const outputPath = path.resolve(__dirname, options.output);
  const exists = fs.existsSync(outputPath);
  checkFileAccess(outputPath);

  if (!exists) {
    throw Error(`Invalid output file path: ${outputPath}`);
  }

  return fs.createWriteStream(outputPath, {
    flags: 'a',
  });
};

const handleErrors = (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error(chalk.red(`\n${err.message}`));
  } else {
    console.log(chalk.green(`\n${options.action} succeeded!`));
  }
};

const initPipeLine = () => {
  try {
    pipeline(inputStream(), cipher, outputStream(), handleErrors);
  } catch (err) {
    console.error(chalk.red(`\n${err.message}`));
    process.exit(1);
  }
};

initPipeLine();

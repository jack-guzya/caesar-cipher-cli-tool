/* eslint-disable no-undef */
import { pipeline } from 'stream';
import fs from 'fs';
import chalk from 'chalk';
import Cipher from './Cipher';
import initCli from './cli';

const options = initCli();

const getInputStream = (filePath: string) => {
  if (!filePath) {
    return process.stdin;
  }

  return fs.createReadStream(filePath);
};

const getOutputStream = (filePath: string) => {
  if (!filePath) {
    return process.stdout;
  }

  return fs.createWriteStream(filePath, {
    flags: 'a',
  });
};

const handleStreamErrors = (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error(chalk.red(`\n${err.message}`));
    process.exit(1);
  } else {
    console.log(chalk.green(`\n${options.action} succeeded!`));
  }
};

pipeline(
  getInputStream(options.input),
  new Cipher(options.action, +options.shift),
  getOutputStream(options.output),
  handleStreamErrors
);

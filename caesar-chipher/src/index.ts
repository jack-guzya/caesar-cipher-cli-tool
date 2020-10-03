import path from 'path';
import { pipeline } from 'stream';
import fs from 'fs';
import chalk from 'chalk';
// import { prompt } from 'inquirer';
import logo from './logo';
import Cipher from './Cipher';
import initCli from './cli';

const options = initCli();
const cipher = new Cipher(options.action, +options.shift);

const inputStream = () =>
  options.input
    ? fs.createReadStream(path.resolve(__dirname, options.input))
    : process.stdin;
const outputStream = () =>
  options.output
    ? fs.createWriteStream(path.resolve(__dirname, options.output))
    : process.stdout;

pipeline(inputStream(), cipher, outputStream(), (err) => {
  if (err) {
    console.error(chalk.red(`\n${err.message}`));
  } else {
    console.log(
      chalk.blue(`\n${logo}`),
      chalk.green(`\n\n\n${options.action} succeeded!`)
    );
  }
});

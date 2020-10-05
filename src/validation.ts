/* eslint-disable consistent-return */
/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
import chalk from 'chalk';
import fs from 'fs';

const checkFileExistence = (path: string) => {
  const exists = fs.existsSync(path);

  if (!exists) {
    throw Error(`Invalid file path: ${path}`);
  }
};

const checkReadFileAccess = (path: string) => {
  try {
    fs.accessSync(path, fs.constants.R_OK);
  } catch {
    throw Error(`Missing read access: ${path}`);
  }
};

const checkWriteFileAccess = (path: string) => {
  try {
    fs.accessSync(path, fs.constants.W_OK);
  } catch {
    throw Error(`Missing write access: ${path}`);
  }
};

const checkActionParameter = (action: string) => {
  if (action !== 'encode' && action !== 'decode') {
    throw Error(
      `Incorrect action parameter "${action}". Action should be "encode" or "decode" parameter`
    );
  }
};

const checkShiftParameter = (shift: string) => {
  if (Number.isNaN(+shift) || +shift <= 0) {
    throw Error(
      `Incorrect shift parameter "${shift}": the value should be a number and be greater than null`
    );
  }
};

export const addErrorHandler = <A extends (args: any) => any>(callback: A) => (
  ...args: Parameters<A>
): ReturnType<A> => {
  try {
    return callback(args);
  } catch (err) {
    console.error(chalk.red(`\n${err.message}`));
    process.exit(1);
  }
};

export default {
  checkFileExistence,
  checkReadFileAccess,
  checkWriteFileAccess,
  checkActionParameter,
  checkShiftParameter,
};

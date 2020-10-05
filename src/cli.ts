import program from 'commander';
import path from 'path';
import validation, { addErrorHandler } from './validation';
import { TAction } from './Cipher';

type TOptions = {
  action: TAction;
  shift: string;
  input: string;
  output: string;
};

const parsePath = (filePath: string) => path.resolve(__dirname, filePath);

program.storeOptionsAsProperties(false);

program.version('1.0.0').description('Caesar cipher cli tool');

program
  .requiredOption('-a, --action <action>', 'select Encode / Decode action')
  .requiredOption('-s, --shift <count>', 'shift letters')
  .option('-i, --input <path>', 'path of an input file', parsePath)
  .option('-o, --output <path>', 'path of an output file', parsePath);

const init = () => {
  program.parse(process.argv);
  const options = program.opts() as TOptions;

  validation.checkActionParameter(options.action);
  validation.checkShiftParameter(options.shift);

  if ('input' in options) {
    validation.checkFileExistence(options.input);
    validation.checkReadFileAccess(options.input);
  }

  if ('output' in options) {
    validation.checkFileExistence(options.output);
    validation.checkWriteFileAccess(options.output);
  }

  return options;
};

export default addErrorHandler(init);

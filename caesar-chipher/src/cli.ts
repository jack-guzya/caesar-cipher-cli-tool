import program from 'commander';
import chalk from 'chalk';
import { TAction } from './Cipher';

type TOptions = {
  action: TAction;
  shift: string;
  input: string;
  output: string;
};

program.storeOptionsAsProperties(false);

program.version('1.0.0').description('Caesar cipher cli tool');

program
  .requiredOption('-a, --action <action>', 'select Encode / Decode action')
  .requiredOption('-s, --shift <count>', 'shift letters')
  .option('-i, --input <path>', 'path of an input file')
  .option('-o, --output <path>', 'path of an output file');

const init = () => {
  program.parse(process.argv);

  const options = program.opts() as TOptions;

  if (options.action !== 'encode' && options.action !== 'decode') {
    console.error(chalk.red('\nIncorrect action parameter\n'));
    process.exit();
  }

  if (Number.isNaN(+options.shift) || +options.shift <= 0) {
    console.error(
      chalk.red(
        '\nIncorrect shift parameter: the value should be a number and be greater than null\n'
      )
    );
    process.exit();
  }

  return options;
};

export default init;

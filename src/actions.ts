import utils from './utils';

const encode = (input: string, shift: number): string => {
  return input.split('').map(utils.getShiftedChar(shift)).join('');
};

const decode = (input: string, shift: number): string => encode(input, -shift);

export default { encode, decode };

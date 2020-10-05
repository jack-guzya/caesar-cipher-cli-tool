/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { Transform, TransformCallback, TransformOptions } from 'stream';

export type TAction = 'encode' | 'decode';

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
      const action = this.action === 'encode' ? this.encode : this.decode;
      const handledChunk = action(
        chunk.toString('utf8'),
        Math.round(this.shift)
      );

      callback(null, handledChunk);
    } catch (err) {
      callback(err);
    }
  }

  private encode = (input: string, shift: number): string => {
    return input.split('').map(this.getShiftedChar(shift)).join('');
  };

  private decode = (input: string, shift: number): string =>
    this.encode(input, -shift);

  private getShiftedCode = (code: number, shift: number): number => {
    const FIRST_UPPER_CHAR_CODE = 65;
    const FIRST_LOWER_CHAR_CODE = 97;
    const CHAR_COUNT = 26;
    const firstCharCode =
      code >= FIRST_LOWER_CHAR_CODE
        ? FIRST_LOWER_CHAR_CODE
        : FIRST_UPPER_CHAR_CODE;

    return (
      firstCharCode +
      ((CHAR_COUNT + (code - firstCharCode) + shift) % CHAR_COUNT)
    );
  };

  private isLetter = (char: string) => /[a-zA-Z]/.test(char);

  private getShiftedChar = (shift: number) => (char: string): string => {
    if (!this.isLetter(char)) {
      return char;
    }

    const code = char.codePointAt(0) as number;
    const shiftedCode = this.getShiftedCode(code, shift);

    return String.fromCodePoint(shiftedCode);
  };
}

export default Cipher;

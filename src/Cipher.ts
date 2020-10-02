/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { Transform, TransformCallback, TransformOptions } from 'stream';
import actions from './actions';

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
      if (this.action !== 'encode' && this.action !== 'decode') {
        throw Error('Incorrect action parameter');
      }
      console.log(this.shift);
      if (Number.isNaN(this.shift) || this.shift <= 0) {
        throw Error(
          'Incorrect shift parameter: the value should be a number and be greater than null'
        );
      }

      const action = this.action === 'encode' ? actions.encode : actions.decode;
      const handledChunk = action(chunk.toString('utf8'), this.shift);

      callback(null, handledChunk);
    } catch (err) {
      callback(err);
    }
  }
}

export default Cipher;

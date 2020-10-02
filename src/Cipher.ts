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

      const action = this.action === 'encode' ? actions.encode : actions.decode;
      callback(null, action(chunk.toString('utf8'), this.shift));
    } catch (err) {
      callback(err);
    }
  }
}

export default Cipher;

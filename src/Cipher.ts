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
      const action = this.action === 'encode' ? actions.encode : actions.decode;
      const handledChunk = action(
        chunk.toString('utf8'),
        Math.round(this.shift)
      );

      callback(null, handledChunk);
    } catch (err) {
      callback(err);
    }
  }
}

export default Cipher;

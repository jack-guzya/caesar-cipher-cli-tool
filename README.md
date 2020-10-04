# Caesar cipher CLI tool

**CLI tool that encodes and decodes a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift (should be a number and be greater than null)
2.  **-i, --input**: an input file (a file should have read/write access)
3.  **-o, --output**: an output file (a file should have read/write access)
4.  **-a, --action**: an action encode/decode

## Usage example:

1. You need to run the TypeScript compiler first to create a build. A build will be created in the "build" folder (**"./build/index.js" is an entry point**)

```bash
npm run build
```

2. To run the cipher tool:

```bash
$ node ./build/index.js -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node ./build/index.js --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node ./build/index.js --action decode --shift 7 --input decoded.txt --output plain.txt
```

Or:

```bash
$ npm run cipher -- -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`


## Alternative

This is a shorter way (script for auto-create build and run tool):

```bash
$ npm start -- -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
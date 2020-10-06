# Caesar cipher CLI tool

**CLI tool for encoding and decoding a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift (should be a number and be greater than null)
2.  **-i, --input**: an input file (a file should have read/write access)
3.  **-o, --output**: an output file (a file should have read/write access)
4.  **-a, --action**: an action encode/decode

## Installation

1. Install all dependencies:

```bash
npm i
```

2. **Important:** You need to run the TypeScript compiler to create a build. A build will be created in the "cipher" folder (**"./cipher/index.js" is an entry point**)

```bash
npm run build
```

## Usage example

To run the cipher tool:

```bash
$ node cipher -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node cipher --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node cipher --action decode --shift 7 --input decoded.txt --output plain.txt
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
# evm-calldata-decode

[![Tests](https://github.com/vojtechsimetka/evm-calldata-decode/actions/workflows/test.yml/badge.svg)](https://github.com/vojtechsimetka/evm-calldata-decode/actions/workflows/test.yml)
[![](https://img.shields.io/badge/made%20by-Vojtech%20Simetka-blue.svg?style=flat-square)](https://simetka.cz/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![](https://img.shields.io/badge/npm-%3E%3D6.9.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/runs%20in-browser%20%7C%20node%20%7C%20webworker%20%7C%20electron-orange)

> Library for decoding function name and arguments from EVM calldata

**Warning: This project is in beta state. There might (and most probably will) be changes in the future to its API and working. Also, no guarantees can be made about its stability, efficiency, and security at this stage.**

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Decode calldata with ABI](#decode-calldata-with-abi)
  - [Decode calldate with online smart contract validator](#decode-calldate-with-online-smart-contract-validator)
  - [Decode calldata with EVM signature database](#decode-calldata-with-evm-signature-database)
- [License](#license)

## Install

```sh
npm install evm-calldata-decode --save
```

## Usage

```ts
import { decodeCallData } from 'evm-calldata-decode'
```

### Decode calldata with ABI

```ts
const calldata = '0x1234567800000...'
const abi = '[{"inputs": [...],"name": "mint","type": "function", ...}, ...]'
decodeCallDataWithSignatureDB(calldata, abi)
```

### Decode calldate with online smart contract validator

**NOT IMPLEMENTED YET**

Attempts to decode calldata with ABI retrieved from Etherscan or Sourcify.

```ts
const calldata = '0x1234567800000....'
const contract_address = '0x0....0'
decodeCallDataWithSignatureDB(calldata, contract_address)
```

### Decode calldata with evm signature database

**NOT IMPLEMENTED YET**

Attempts to decode calldata with a signature retrieved from Ethereum Signature Database. This is a last resort option if only the calldata are known.

```ts
const calldata = '0x1234567800000....'
decodeCallDataWithSignatureDB(calldata)
```

[**Check out our examples repo for some more ideas on how to use `bee-js`**](https://github.com/ethersphere/examples-js)

## Maintainers

- [vojtechsimetka](https://github.com/vojtechsimetka)

## License

[MIT](./LICENSE)

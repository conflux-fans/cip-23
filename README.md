# `cip-23`

![Version](https://img.shields.io/npm/v/cip-23) 
![License](https://img.shields.io/github/license/conflux-fans/cip-23) 
[![Actions Status](https://github.com/conflux-fans/cip-23/workflows/CI/badge.svg)](https://github.com/conflux-fans/cip-23/actions) 
[![codecov](https://codecov.io/gh/conflux-fans/cip-23/branch/master/graph/badge.svg)](https://codecov.io/gh/conflux-fans/cip-23)

This libray if forked from [Mrtenz/eip-712](https://github.com/Mrtenz/eip-712) to Support Conflux [CIP-23](https://github.com/Conflux-Chain/CIPs/blob/2d9fdbdb08f66f705348669a6cd85e2d53509e97/CIPs/cip-23.md)

[Mrtenz/eip-712](https://github.com/Mrtenz/eip-712) is a library for Node.js and web browsers with some utility functions that can help with signing and verifying [EIP-712](https://eips.ethereum.org/EIPS/eip-712) based messages. It is fully written in TypeScript, and is currently only compatible with the latest specification of EIP-712 ([eth_signTypedData_v4](https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4)).

https://eips.ethereum.org/EIPS/eip-712

Note that this library currently does not handle the signing itself. For this, you can use something like Ethers.js or ethereumjs-util. For examples, please see the [`examples`](https://github.com/conflux-fans/cip-23/blob/master/examples) folder.

## Installation

You can install this library with Yarn or NPM:

```
$ yarn add cip-23
```

```
$ npm install cip-23
```

There is a CommonJS version as well as an ES6 version available. Most tools should automatically pick the right version (e.g. Node.js, Webpack).

### Getting Started

First, define your typed data as a JSON object, according to the JSON schema specified by cip-23. For example:

```json
{
  "types": {
    "CIP23Domain": [
      { "name": "name", "type": "string" },
      { "name": "version", "type": "string" },
      { "name": "chainId", "type": "uint256" },
      { "name": "verifyingContract", "type": "address" }
    ],
    "Person": [
      { "name": "name", "type": "string" },
      { "name": "wallet", "type": "address" }
    ],
    "Mail": [
      { "name": "from", "type": "Person" },
      { "name": "to", "type": "Person" },
      { "name": "contents", "type": "string" }
    ]
  },
  "primaryType": "Mail",
  "domain": {
    "name": "Ether Mail",
    "version": "1",
    "chainId": 1,
    "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
  },
  "message": {
    "from": {
      "name": "Cow",
      "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
    },
    "to": {
      "name": "Bob",
      "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
    },
    "contents": "Hello, Bob!"
  }
}
```

### Functions

Here is a brief description of the functions available in this library. For more detailed examples, you can refer to [`src/cip-23.test.ts`](https://github.com/conflux-fans/cip-23/blob/master/src/cip-23.test.ts), or to the examples in the [`examples`](https://github.com/conflux-fans/cip-23/blob/master/examples) folder.

#### `getMessage(typedData, hash?, domainName?)`

This function will return the full EIP-191 encoded message to be signed as Buffer, for the typed data specified. If `hash` is enabled, the message will be hashed using Keccak256.

```js
import { getMessage } from 'cip-23';

const typedData = { /*...*/ };
console.log(getMessage(typedData).toString('hex')); // 1901f2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090fc52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e
console.log(getMessage(typedData, true).toString('hex')); // be609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2
// Generate a Ethereum EIP712 message
console.log(getMessage(typedData, true, false).toString('hex')); 
```

#### `asArray(typedData)`

This function returns the typed data as an array. This can be useful for encoding typed data as ABI.

```js
import { asArray } from 'cip-23';

const typedData = { /*...*/ };
console.log(asArray(typedData)); // [ ['Cow', '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'], ['Bob', '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'], 'Hello, Bob!' ]
```

#### `getStructHash(typedData, type, data)`

This function returns a Keccak-256 hash for a single struct type (e.g. cip-23, Person or Mail).

```js
import { getStructHash } from 'cip-23';

const typedData = { /*...*/ };
console.log(getStructHash(typedData, 'cip-23', typedData.domain).toString('hex')); // f2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090f
```

#### `encodeData(typedData, type, data)`

This function returns the raw ABI encoded data for the struct type.

```js
import { encodeData } from 'cip-23';

const typedData = { /*...*/ };
console.log(encodeData(typedData, 'CIP23Domain', typedData.domain).toString('hex')); // 8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400fc70ef06638535b4881fafcac8287e210e3769ff1a8e91f1b95d6246e61e4d3c6c89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc60000000000000000000000000000000000000000000000000000000000000001000000000000000000000000cccccccccccccccccccccccccccccccccccccccc
```

#### `getTypeHash(typedData, type)`

This function returns the type hash for a struct type. This is the same as `Keccak256(CIP23Domain(string name,string version,uint256 chainId,address verifyingContract))`, with optional sub-types automatically included too.

```js
import { getTypeHash } from 'cip-23';

const typedData = { /*...*/ };
console.log(getTypeHash(typedData, 'CIP23Domain').toString('hex')); // 8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f
```

#### `encodeType(typedData, type)`

This function returns the type before hashing it, e.g. `CIP23Domain(string name,string version,uint256 chainId,address verifyingContract)`, with optional sub-types automatically included too.

```js
import { encodeType } from 'cip-23';

const typedData = { /*...*/ };
console.log(encodeType(typedData, 'CIP23Domain')); // CIP23Domain(string name,string version,uint256 chainId,address verifyingContract)
```

#### `getDependencies(typedData, type)`

This function returns all sub-types used by a struct as a string array. If the struct has no sub-types (like `CIP23Domain`), an array with only the type itself is returned.

```js
import { getDependencies } from 'cip-23';

const typedData = { /*...*/ };
console.log(getDependencies(typedData, 'CIP23Domain')); // ['CIP23Domain']
console.log(getDependencies(typedData, 'Mail')); // ['Mail', 'Person']
```

import { keccak_256 } from '@noble/hashes/sha3';

export { bytesToHex, hexToBytes, utf8ToBytes, toBytes, isBytes, concatBytes } from '@noble/hashes/utils';
/**
 * Hashes the data with the optional encoding specified. If no encoding is specified, it is assumed that the data is
 * already a Uint8Array.
 *
 * @param {string | Uint8Array} data
 * @return {Uint8Array}
 */
export const keccak256 = (data: string | Uint8Array): Uint8Array => {
  return keccak_256(data);
};

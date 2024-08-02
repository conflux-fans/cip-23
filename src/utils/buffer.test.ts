import { bytesToHex, keccak256, toBytes } from './buffer';

describe('keccak256', () => {
  it('returns a keccak256 hash of a string', () => {
    expect(bytesToHex(keccak256('foo bar'))).toBe('737fe0cb366697912e27136f93dfb531c58bab1b09c40842d999110387c86b54');
    expect(bytesToHex(keccak256('foo bar'))).toBe('737fe0cb366697912e27136f93dfb531c58bab1b09c40842d999110387c86b54');
  });

  it('returns a keccak256 hash of a byte', () => {
    const buffer = toBytes('foo bar');
    expect(bytesToHex(keccak256(buffer))).toBe('737fe0cb366697912e27136f93dfb531c58bab1b09c40842d999110387c86b54');
  });
});

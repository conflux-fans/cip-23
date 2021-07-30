import { is } from 'superstruct';
import { CIP_23_TYPED_DATA_TYPE, EIP_712_TYPED_DATA_TYPE, TypedData } from '../types';

/**
 * Validates that `data` matches the CIP-23 or EIP-712 JSON schema.
 *
 * @param {any} data
 * @return {boolean}
 */
export const validateTypedData = (data: unknown): data is TypedData => {
  return is(data, CIP_23_TYPED_DATA_TYPE) || is(data, EIP_712_TYPED_DATA_TYPE);
};

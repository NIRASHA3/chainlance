/**
 * Compile-time representation of an EVM wallet or contract address.
 *
 * This type does not replace runtime address validation.
 * Values received from users, APIs, wallets, or blockchain providers
 * must still be validated before they are trusted.
 */
export type EvmAddress = `0x${string}`;

/**
 * EVM-compatible chain identifier.
 *
 * Examples include Ethereum mainnet and supported test networks.
 */
export type ChainId = number;

/**
 * Compile-time representation of hexadecimal EVM data.
 *
 * Runtime validation is still required for untrusted input.
 */
export type Hex = `0x${string}`;
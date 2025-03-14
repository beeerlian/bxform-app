/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 * @example
 * ```typescript
 * capitalize('hello'); // 'Hello'
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Trims whitespace from both ends of a string.
 * @param str - The string to trim.
 * @returns The trimmed string.
 * @example
 * ```typescript
 * trim('  hello  '); // 'hello'
 * ```
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Converts a string to lowercase.
 * @param str - The string to convert.
 * @returns The lowercase string.
 * @example
 * ```typescript
 * toLowerCase('HELLO'); // 'hello'
 * ```
 */
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

/**
 * Converts a string to uppercase.
 * @param str - The string to convert.
 * @returns The uppercase string.
 * @example
 * ```typescript
 * toUpperCase('hello'); // 'HELLO'
 * ```
 */
export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

/**
 * Reverses a string.
 * @param str - The string to reverse.
 * @returns The reversed string.
 * @example
 * ```typescript
 * reverse('hello'); // 'olleh'
 * ```
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Replaces all occurrences of a substring with a new substring.
 * @param str - The original string.
 * @param searchValue - The substring to replace.
 * @param replaceValue - The new substring.
 * @returns The modified string.
 * @example
 * ```typescript
 * replaceAll('hello world', 'world', 'everyone'); // 'hello everyone'
 * ```
 */
export function replaceAll(str: string, searchValue: string, replaceValue: string): string {
  return str.split(searchValue).join(replaceValue);
}

/**
 * Converts a timestamp string to a Date object.
 * @param timestamp - The timestamp string to convert.
 * @returns The Date object or null if an error occurs.
 * @example
 * ```typescript
 * toDate('2024-07-20T06:48:45.733514+00:00'); // Date object representing the timestamp
 * ```
 */
export function toDate(timestamp?: string): Date | null {
  try {
    if (!timestamp) return null;
    return new Date(timestamp!);
  } catch (error) {
    return null;
  }
}

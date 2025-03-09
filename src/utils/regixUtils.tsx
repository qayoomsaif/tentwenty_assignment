// src/utils/regexUtils.ts

// Email regex to validate standard email format
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex to validate at least 8 characters with letters and numbers
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const otpRegex = /^[a-z0-9]{5}-[a-z0-9]{5}-[a-z0-9]{5}$/;


export function insertHyphenAfterEveryFiveCharacters(inputString: string) {
  // First, remove existing hyphens
  let stringWithoutHyphens = inputString.replace(/-/g, '');
  // Then, insert hyphens after every 5 characters
  return stringWithoutHyphens.replace(/(.{5})/g, '$1-');
}

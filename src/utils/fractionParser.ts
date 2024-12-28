import { Fraction } from './Fraction';

export function parseFractionInput(input: string): Fraction {
  // Remove spaces
  const cleanInput = input.trim();
  
  // Handle empty input
  if (!cleanInput) {
    return new Fraction(0);
  }

  // Handle negative signs
  const isNegative = cleanInput.startsWith('-');
  const absInput = cleanInput.replace(/^-/, '');

  // Parse different formats
  if (absInput.includes('/')) {
    const [numerator, denominator] = absInput.split('/');
    const num = parseInt(numerator);
    const den = parseInt(denominator);
    
    if (isNaN(num) || isNaN(den) || den === 0) {
      throw new Error('Invalid fraction');
    }
    
    return new Fraction(isNegative ? -num : num, den);
  }
  
  // Handle decimal input
  if (absInput.includes('.')) {
    const decimal = parseFloat(isNegative ? `-${absInput}` : absInput);
    if (isNaN(decimal)) {
      throw new Error('Invalid decimal');
    }
    
    // Convert decimal to fraction
    const precision = 1000000; // 6 decimal places
    const numerator = Math.round(decimal * precision);
    return new Fraction(numerator, precision);
  }
  
  // Handle integer input
  const integer = parseInt(isNegative ? `-${absInput}` : absInput);
  if (isNaN(integer)) {
    throw new Error('Invalid integer');
  }
  return new Fraction(integer);
}
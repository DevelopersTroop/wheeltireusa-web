// import { TBillingAddress, TDealer } from '@/types/order';

export function capitalizeWords(str: string) {
  return str
    .split(/[_\s-]+/) // Split string by underscore, whitespace, or hyphen
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ) // Capitalize each word
    .join(' '); // Join the words with a space
}

// create a function that will transform a string camel case to Capitalize words
export function camelCaseToWords(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1') // Add a space before every capital letter
    .replace(/^./, (firstLetter: string) => firstLetter.toUpperCase()) // Capitalize the first letter
    .trim(); // Remove leading and trailing whitespace
}

export function truncWord(text?: string, count: number = 6) {
  if (!text) return '';
  const words = text.split(' ');

  if (words.length > count) {
    return words.slice(0, count).join(' ') + '...';
  } else {
    return text;
  }
}

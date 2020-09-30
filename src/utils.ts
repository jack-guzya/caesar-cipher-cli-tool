const getShiftedCode = (code: number, shift: number): number => {
  const FIRST_UPPER_CHAR_CODE = 65;
  const FIRST_LOWER_CHAR_CODE = 97;
  const CHAR_COUNT = 26;
  const firstCharCode =
    code >= FIRST_LOWER_CHAR_CODE
      ? FIRST_LOWER_CHAR_CODE
      : FIRST_UPPER_CHAR_CODE;

  return (
    firstCharCode + ((CHAR_COUNT + (code - firstCharCode) + shift) % CHAR_COUNT)
  );
};

const isLetter = (char: string) => /[a-zA-Z]/.test(char);

const getShiftedChar = (shift: number) => (char: string): string => {
  if (!isLetter(char)) {
    return char;
  }

  const code = char.codePointAt(0) as number;
  const shiftedCode = getShiftedCode(code, shift);

  return String.fromCodePoint(shiftedCode);
};

export default { getShiftedChar };

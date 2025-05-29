export const parsingNumber = (number, defaultNumber) => {
  if (typeof number === 'string') {
    const getNum = Number.parseInt(number);
    if (Number.isNaN(getNum)) {
      return defaultNumber;
    }
    return getNum;
  }
  return defaultNumber;
};

const RUBLES_RADIX = 10;

const rublesFormat = new Intl.NumberFormat(`ru`, {maximumFractionDigits: 0});
const yearsFormat = new Intl.NumberFormat(`ru`, {maximumFractionDigits: 0});

/**
 * @param {number} value
 * @return {string}
 */
const formatRubles = (value) => {
  return `${rublesFormat.format(value)} рублей`;
};

/**
 * @param {string} formattedValue
 * @return {number}
 */
const parseRubles = (formattedValue) => {
  return Number.parseInt(formattedValue.replace(/\u00a0/ug, ``), RUBLES_RADIX);
};

/**
 * @param {number} value
 * @return {string}
 */
const formatYears = (value) => {
  return `${yearsFormat.format(value)} лет`;
};

export {
  formatRubles,
  parseRubles,
  formatYears,
};

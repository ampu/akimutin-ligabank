import {clamp} from 'lodash';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

const formatInteger = (value) => {
  return integerFormat.format(Math.ceil(value));
};

const formatFloat = (value) => {
  return floatFormat.format(value);
};

const formatYearsSuffix = (numberOfYears) => {
  return dayjs.duration(numberOfYears, `years`)
    .humanize()
    .replace(/\d+/, ``)
    .replace(/^\s*/, ` `);
};

const coerceByConstraint = (value, {min, max}) => {
  return clamp(value, min, max);
};

const isValidByConstraint = (value, {min, max}) => {
  return min <= value && value <= max;
};

const integerFormat = new Intl.NumberFormat(`ru`, {maximumFractionDigits: 0});
const floatFormat = new Intl.NumberFormat(`ru`, {maximumFractionDigits: 2});

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(`ru`);

export {
  formatInteger,
  formatFloat,
  coerceByConstraint,
  isValidByConstraint,
  formatYearsSuffix,
};

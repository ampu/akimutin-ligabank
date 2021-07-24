import {clamp} from 'lodash';

import {CREDIT_GOALS} from '../constants/credit-goal';
import {PROPERTY_VALUE_CONSTRAINT} from '../constants/property-value-constraint';
import {INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT} from '../constants/initial-payment-percentage-constraint';
import {CREDIT_PERIOD_CONSTRAINT} from '../constants/credit-period-constraint';
import {PERCENTAGE_CONSTRAINT} from '../constants/percentage-constraint';

const MATERNITY_CAPITAL_AMOUNT = 470000;

const INTEREST_RATE = {
  initialPaymentPercentageThreshold: 15,
  lowerBound: 9.4,
  upperBound: 8.5,
};

const formatInteger = (value) => {
  return integerFormat.format(value);
};

const formatFloat = (value) => {
  return floatFormat.format(value);
};

const calculateInitialPayment = ({propertyValue, initialPaymentPercentage}) => {
  return Math.round(propertyValue * initialPaymentPercentage / PERCENTAGE_CONSTRAINT.max);
};

const calculateInitialPaymentPercentage = ({propertyValue, initialPayment}) => {
  return propertyValue === 0
    ? INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT.min
    : clamp(initialPayment / propertyValue * PERCENTAGE_CONSTRAINT.max,
        INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT.min,
        INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT.max);
};

const calculateCreditPeriod = (value) => {
  return clamp(value || 0, CREDIT_PERIOD_CONSTRAINT.min, CREDIT_PERIOD_CONSTRAINT.max);
};

const calculateCreditAmount = ({propertyValue, isMaternityCapital}) => {
  return propertyValue - (isMaternityCapital && MATERNITY_CAPITAL_AMOUNT);
};

const calculateInterestRate = (initialPaymentPercentage) => {
  return initialPaymentPercentage < INTEREST_RATE.initialPaymentPercentageThreshold
    ? INTEREST_RATE.lowerBound
    : INTEREST_RATE.upperBound;
};

const findCreditGoalByValue = (creditGoal) => {
  return CREDIT_GOALS.find(({value}) => creditGoal === value);
};

const isValidPropertyValue = (propertyValue) => {
  return propertyValue >= PROPERTY_VALUE_CONSTRAINT.min && propertyValue <= PROPERTY_VALUE_CONSTRAINT.max;
};

const integerFormat = new Intl.NumberFormat(`ru`, {maximumFractionDigits: 0});
const floatFormat = new Intl.NumberFormat(`ru`, {maximumFractionDigits: 2});

export {
  formatInteger,
  formatFloat,
  calculateInitialPayment,
  calculateInitialPaymentPercentage,
  calculateCreditPeriod,
  calculateCreditAmount,
  calculateInterestRate,
  findCreditGoalByValue,
  isValidPropertyValue,
};

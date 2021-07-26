import {CreditGoalValue} from '../constants/credit-goal-value';
import {CREDIT_GOALS} from '../constants/credit-goal';
import {PERCENTAGE_CONSTRAINT} from '../constants/percentage-constraint';
import {coerceByConstraint, isValidByConstraint} from './number-helpers';

const MATERNITY_CAPITAL_AMOUNT = 470000;

const REQUEST_ID_LENGTH = 4;

const MORTGAGE_INTEREST_RATE = {
  initialPaymentPercentageThreshold: 15,
  lowerBound: 9.4,
  upperBound: 8.5,
};

const MORTGAGE_INCOME_THRESHOLD = 0.45;

const CAR_INTEREST_RATE = {
  propertyAmountThreshold: 2000000,
  lowerBound: 16,
  upperBound: 15,
  withCascoOrLifeInsurance: 8.5,
  withCascoAndLifeInsurance: 3.5,
};

const CAR_INCOME_THRESHOLD = 0.45;

const MONTHS_IN_YEAR = 12;

const formatRequestId = (requestId) => {
  return requestId.toString().padStart(REQUEST_ID_LENGTH, `0`);
};

const calculateInitialPayment = ({propertyAmount, initialPaymentPercentage}) => {
  return Math.round(propertyAmount * initialPaymentPercentage / PERCENTAGE_CONSTRAINT.max);
};

const calculateInitialPaymentPercentage = (initialPaymentPercentageConstraint, {propertyAmount, initialPayment}) => {
  return propertyAmount === 0
    ? initialPaymentPercentageConstraint.min
    : coerceByConstraint(initialPayment / propertyAmount * PERCENTAGE_CONSTRAINT.max, initialPaymentPercentageConstraint);
};

const calculateCreditAmount = ({
  creditGoalValue,
  propertyAmount,
  initialPaymentPercentage,
  isMaternityCapital
}) => {
  const initialPayment = propertyAmount / PERCENTAGE_CONSTRAINT.max * initialPaymentPercentage;

  switch (creditGoalValue) {
    case CreditGoalValue.MORTGAGE:
      return propertyAmount - initialPayment - (isMaternityCapital && MATERNITY_CAPITAL_AMOUNT);

    case CreditGoalValue.CAR:
      return propertyAmount - initialPayment;
  }
  return 0;
};

const calculateInterestRate = ({
  creditGoalValue,
  propertyAmount,
  initialPaymentPercentage,
  isCasco,
  isLifeInsurance
}) => {
  switch (creditGoalValue) {
    case CreditGoalValue.MORTGAGE:
      return initialPaymentPercentage < MORTGAGE_INTEREST_RATE.initialPaymentPercentageThreshold
        ? MORTGAGE_INTEREST_RATE.lowerBound
        : MORTGAGE_INTEREST_RATE.upperBound;

    case CreditGoalValue.CAR:
      return ((isCasco && isLifeInsurance) && CAR_INTEREST_RATE.withCascoAndLifeInsurance)
        || ((isCasco || isLifeInsurance) && CAR_INTEREST_RATE.withCascoOrLifeInsurance)
        || (propertyAmount < CAR_INTEREST_RATE.propertyAmountThreshold
          ? CAR_INTEREST_RATE.lowerBound
          : CAR_INTEREST_RATE.upperBound);
  }
  return 0;
};

const calculateMonthlyPayment = (formData) => {
  const {creditPeriod} = formData;

  const creditAmount = calculateCreditAmount(formData);
  const interestRate = calculateInterestRate(formData) / MONTHS_IN_YEAR / PERCENTAGE_CONSTRAINT.max;
  const paymentMonths = creditPeriod * MONTHS_IN_YEAR;

  return (creditAmount * interestRate) / (1 - Math.pow(1 + interestRate, -paymentMonths));
};

const calculateMonthlyIncome = (formData) => {
  const {creditGoalValue} = formData;

  switch (creditGoalValue) {
    case CreditGoalValue.MORTGAGE:
      return calculateMonthlyPayment(formData) / MORTGAGE_INCOME_THRESHOLD;

    case CreditGoalValue.CAR:
      return calculateMonthlyPayment(formData) / CAR_INCOME_THRESHOLD;
  }
  return 0;
};

const isValidFormData = ({constraints}, {propertyAmount, initialPaymentPercentage, creditPeriod}) => {
  return isValidByConstraint(propertyAmount, constraints.propertyAmount)
    && isValidByConstraint(initialPaymentPercentage, constraints.initialPaymentPercentage)
    && isValidByConstraint(creditPeriod, constraints.creditPeriod);
};

const findCreditGoalByValue = (creditGoal) => {
  return CREDIT_GOALS.find(({value}) => creditGoal === value);
};

export {
  formatRequestId,
  calculateInitialPayment,
  calculateInitialPaymentPercentage,
  calculateCreditAmount,
  calculateInterestRate,
  calculateMonthlyPayment,
  calculateMonthlyIncome,
  isValidFormData,
  findCreditGoalByValue,
};

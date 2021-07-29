import {CreditGoal} from './credit-goal';

import {MortgageCreditParameters} from '../components/credit-calculator-page/mortgage-credit-parameters';
import {CarCreditParameters} from '../components/credit-calculator-page/car-credit-parameters';

/** @enum */
const MortgageFieldConstraint = {
  PROPERTY_AMOUNT: {min: 1200000, max: 25000000, step: 100000},
  INITIAL_PAYMENT_PERCENTAGE: {min: 10, max: 100, step: 5},
  CREDIT_PERIOD: {min: 5, max: 30, step: 1},
};

/** @enum */
const CarFieldConstraint = {
  PROPERTY_AMOUNT: {min: 500000, max: 5000000, step: 50000},
  INITIAL_PAYMENT_PERCENTAGE: {min: 20, max: 100, step: 5},
  CREDIT_PERIOD: {min: 1, max: 5, step: 1},
};

/** @enum */
export const CreditSetting = {
  DEFAULT: {
    value: CreditGoal.DEFAULT,
    title: `Выберите цель кредита`,
  },
  MORTGAGE: {
    value: CreditGoal.MORTGAGE,
    title: `Ипотечное кредитование`,
    propertyAmountTitle: `Стоимость недвижимости`,
    creditAmountTitle: `Сумма ипотеки`,
    requestTitle: `Ипотека`,
    denialTitle: `ипотечные кредиты`,
    denialAmount: 500000,
    FieldConstraint: MortgageFieldConstraint,
    defaultFormData: {
      id: 0,
      creditGoalValue: CreditGoal.MORTGAGE,
      propertyAmount: MortgageFieldConstraint.PROPERTY_AMOUNT.min,
      initialPaymentPercentage: MortgageFieldConstraint.INITIAL_PAYMENT_PERCENTAGE.min,
      creditPeriod: MortgageFieldConstraint.CREDIT_PERIOD.min,
      isMaternityCapital: false,
      isCasco: false,
      isLifeInsurance: false,
      name: ``,
      phone: ``,
      email: ``,
    },
    parametersComponent: MortgageCreditParameters,
  },
  CAR: {
    value: CreditGoal.CAR,
    title: `Автомобильное кредитование`,
    propertyAmountTitle: `Стоимость автомобиля`,
    creditAmountTitle: `Сумма автокредита`,
    requestTitle: `Автокредит`,
    denialTitle: `автокредиты`,
    denialAmount: 200000,
    FieldConstraint: CarFieldConstraint,
    defaultFormData: {
      id: 0,
      creditGoalValue: CreditGoal.CAR,
      propertyAmount: CarFieldConstraint.PROPERTY_AMOUNT.min,
      initialPaymentPercentage: CarFieldConstraint.INITIAL_PAYMENT_PERCENTAGE.min,
      creditPeriod: CarFieldConstraint.CREDIT_PERIOD.min,
      isMaternityCapital: false,
      isCasco: false,
      isLifeInsurance: false,
      name: ``,
      phone: ``,
      email: ``,
    },
    parametersComponent: CarCreditParameters,
  }
};

export const CREDIT_GOALS = Object.values(CreditSetting);

import {CreditGoalValue} from '../constants/credit-goal-value';

import {MortgageCreditParameters} from '../components/credit-calculator-page/mortgage-credit-parameters';
import {CarCreditParameters} from '../components/credit-calculator-page/car-credit-parameters';

const MORTGAGE_CONSTRAINTS = {
  propertyAmount: {min: 1200000, max: 25000000, step: 100000},
  initialPaymentPercentage: {min: 10, max: 100, step: 5},
  creditPeriod: {min: 5, max: 30, step: 1},
};

const CAR_CONSTRAINTS = {
  propertyAmount: {min: 500000, max: 5000000, step: 50000},
  initialPaymentPercentage: {min: 20, max: 100, step: 5},
  creditPeriod: {min: 1, max: 5, step: 1},
};

/** @enum */
export const CreditGoal = {
  DEFAULT: {
    value: CreditGoalValue.DEFAULT,
    title: `Выберите цель кредита`,
  },
  MORTGAGE: {
    value: CreditGoalValue.MORTGAGE,
    title: `Ипотечное кредитование`,
    propertyAmountTitle: `Стоимость недвижимости`,
    creditAmountTitle: `Сумма ипотеки`,
    requestTitle: `Ипотека`,
    denialTitle: `ипотечные кредиты`,
    denialAmount: 500000,
    constraints: MORTGAGE_CONSTRAINTS,
    defaultFormData: {
      id: 0,
      creditGoalValue: CreditGoalValue.MORTGAGE,
      propertyAmount: MORTGAGE_CONSTRAINTS.propertyAmount.min,
      initialPaymentPercentage: MORTGAGE_CONSTRAINTS.initialPaymentPercentage.min,
      creditPeriod: MORTGAGE_CONSTRAINTS.creditPeriod.min,
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
    value: CreditGoalValue.CAR,
    title: `Автомобильное кредитование`,
    propertyAmountTitle: `Стоимость автомобиля`,
    creditAmountTitle: `Сумма автокредита`,
    requestTitle: `Автокредит`,
    denialTitle: `автокредиты`,
    denialAmount: 200000,
    constraints: CAR_CONSTRAINTS,
    defaultFormData: {
      id: 0,
      creditGoalValue: CreditGoalValue.CAR,
      propertyAmount: CAR_CONSTRAINTS.propertyAmount.min,
      initialPaymentPercentage: CAR_CONSTRAINTS.initialPaymentPercentage.min,
      creditPeriod: CAR_CONSTRAINTS.creditPeriod.min,
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

export const CREDIT_GOALS = Object.values(CreditGoal);

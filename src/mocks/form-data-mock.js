import {customAlphabet as generateAlphabet} from 'nanoid';

import {CreditGoal} from '../constants/credit-goal';

const generateId = generateAlphabet(`1234567890`, 4);

export const FORM_DATA_MOCK = {
  id: generateId(),
  creditGoalValue: CreditGoal.MORTGAGE.value,
  propertyAmount: 2000000,
  initialPaymentPercentage: 10,
  creditPeriod: 5,
  isMaternityCapital: true,
};
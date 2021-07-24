/** @enum */
export const CreditGoal = {
  DEFAULT: {
    value: ``,
    title: `Выберите цель кредита`,
    denialTitle: `...`,
    denialAmount: 0,
  },
  MORTGAGE: {
    value: `mortgage`,
    title: `Ипотечное кредитование`,
    denialTitle: `ипотечные кредиты`,
    denialAmount: 500000,
  },
  CAR: {
    value: `car`,
    title: `Автомобильное кредитование`,
    denialTitle: `автокредиты`,
    denialAmount: 200000,
  }
};

export const CREDIT_GOALS = Object.values(CreditGoal);

export const CREDIT_GOAL_VALUES = CREDIT_GOALS.map((creditGoal) => creditGoal.value);

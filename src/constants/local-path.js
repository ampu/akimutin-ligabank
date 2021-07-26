/** @enum */
export const LocalPath = {
  INDEX: `/`,

  SERVICES: `/services`,
  CREDIT_CALCULATOR: `/credit-calculator`,
  CURRENCY_CONVERTER: `/currency-converter`,
  CONTACTS: `/contacts`,

  SIGN_IN: `/sign-in`,
  FORGOTTEN_PASSWORD: `/forgotten-password`,
  ASK_QUESTION: `/ask-question`,

  DEPOSITS: `/deposits`,
  INSURANCE: `/insurance`,
  ONLINE_SERVICES: `/online-services`,
  CREDIT_REQUEST: `/credit-request`,
};

export const CREDIT_CALCULATOR_PAGE_PATHS = [
  LocalPath.INDEX,
  LocalPath.SERVICES,
  LocalPath.CREDIT_CALCULATOR,
  LocalPath.CONTACTS,
  LocalPath.SIGN_IN,
];

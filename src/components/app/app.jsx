import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {CreditCalculatorPage} from '../credit-calculator-page/credit-calculator-page';
import {NotFoundPage} from '../not-found-page/not-found-page';

import {CREDIT_CALCULATOR_PAGE_PATHS} from '../../constants/local-path';

const App = () => {
  return (
    <Switch>
      <Route exact path={CREDIT_CALCULATOR_PAGE_PATHS}>
        <CreditCalculatorPage/>
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  );
};

export {App};

import React, {useEffect} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';

import {scrollIntoViewById} from '../../helpers/dom-helpers';

import {CreditCalculatorPage} from '../credit-calculator-page/credit-calculator-page';
import {NotFoundPage} from '../not-found-page/not-found-page';

import {CREDIT_CALCULATOR_PAGE_PATHS} from '../../constants/local-path';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    scrollIntoViewById(location.pathname);
  }, [location.pathname]);

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

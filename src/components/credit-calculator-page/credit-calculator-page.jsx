/* eslint-disable */
import React from 'react';

import {HeaderWithHeaderState as Header} from '../header/header';
import {HeroAreaWithSlider as HeroArea} from '../hero-area/hero-area';
import {ServicesWithTabsAndSlider as Services} from '../services/services';
import {CreditCalculatorWithCreditCalculatorState as CreditCalculator} from './credit-calculator';
import {Offices} from '../offices/offices';
import {Footer} from '../footer/footer';

const CreditCalculatorPage = () => {
  return <>
    <Header/>
    <main>
      <HeroArea/>
      <Services/>
      <CreditCalculator/>
      <Offices/>
    </main>
    <Footer/>
  </>;
};

export {CreditCalculatorPage};

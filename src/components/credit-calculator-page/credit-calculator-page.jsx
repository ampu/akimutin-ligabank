import React from 'react';

import {HeaderWithHeaderState as Header} from '../header/header';
// import {HeroAreaWithSlider as HeroArea} from '../hero-area/hero-area';
// import {ServicesWithSlider as Services} from '../services/services';
import {CreditCalculator} from './credit-calculator';
// import {Offices} from '../offices/offices';
import {Footer} from '../footer/footer';

const CreditCalculatorPage = () => {
  return <>
    <Header/>
    <main className="credit-calculator-page">
      <CreditCalculator/>
    </main>
    <Footer/>
  </>;
};

export {CreditCalculatorPage};

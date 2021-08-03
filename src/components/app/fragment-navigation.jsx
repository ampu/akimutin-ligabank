import React from 'react';

import {useFragmentNavigation} from '../../hooks/use-fragment-navigation';

const FragmentNavigation = () => {
  useFragmentNavigation();

  return <React.Fragment/>;
};

export {FragmentNavigation};

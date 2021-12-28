import React from 'react';

import AppNavigator from './AppNavigator';
import {StoreProvider} from '../store';

const App = () => {
  return (
    <StoreProvider>
      <AppNavigator />
    </StoreProvider>
  );
};

export default App;

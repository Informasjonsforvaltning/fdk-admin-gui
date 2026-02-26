import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from '@fellesdatakatalog/theme';

import AuthProvider from '../../../providers/auth';

import store from '../redux/store';

import GlobalStyles from '../styles';

import Router from '../router';

const App: FC = () => (
  <ThemeProvider>
    <GlobalStyles />
    <ReduxProvider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ReduxProvider>
  </ThemeProvider>
);

export default App;

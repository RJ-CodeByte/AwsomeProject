import { View, Text } from 'react-native'
import React from 'react';
import Home from '~/screen/home';
import { Provider } from 'react-redux';
import setupStore, { persistor } from '~/store/store.index';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={setupStore}>
<PersistGate loading={null} persistor={persistor}>
      <Home />
</PersistGate>
    </Provider>
  )
}

export default App
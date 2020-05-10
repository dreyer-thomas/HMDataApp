import React from 'react';
import DrawerNavigator from './Components/DrawerNavigator'
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
        <DrawerNavigator/>
    </Provider>
  );
}
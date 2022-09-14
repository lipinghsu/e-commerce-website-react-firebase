import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux';
import { store, persistor } from './redux/createStore';
import { PersistGate } from 'redux-persist/integration/react';

import "./i18n";

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          {/* <SafeAreaView style={{backgroundColor:'white'}}> */}
            <App />
          {/* </SafeAreaView> */}
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
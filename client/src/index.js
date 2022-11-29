import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { Provider } from 'react-redux';
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><Provider store={store}><App /></Provider></React.StrictMode>);






// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {PersistGate} from 'redux-persist/integration/react'
// import {persistStore} from 'redux-persist'
// import { Provider } from 'react-redux';
// import store from './redux/store'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// let persistor=persistStore(store)
// root.render(<React.StrictMode><Provider store={store}>
//     <PersistGate persistor={persistor}>
//         <App /></PersistGate></Provider></React.StrictMode>);


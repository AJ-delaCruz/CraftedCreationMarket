import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css'; //on index.html

import {store } from "./modernRedux/store";
import { Provider } from "react-redux";

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)


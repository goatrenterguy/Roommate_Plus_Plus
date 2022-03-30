import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import PrimaryTopNav from "./Components/TopNav/PrimaryTopNav";
import Footer from "./Components/Footer/Footer";
Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <PrimaryTopNav/>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="page_1" element={<p>page 1</p>} />
              <Route path="page_2" element={<p>page 2</p>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

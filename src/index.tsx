import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import VideoList from './components/videos/VideoList';
import VideoForm from './components/videos/VideoForm';
import Navbar from './components/navbar/Navbar';

import './index.css';
import 'bootswatch/dist/pulse/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<VideoList />}></Route>
          <Route path="/new-video" element={<VideoForm />}></Route>
          <Route path="/update/:id" element={<VideoForm />}></Route>
        </Routes>
        <ToastContainer/>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

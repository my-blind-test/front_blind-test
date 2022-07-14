import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from './routes/game';
import Home from './routes/home';
import Lobby from './routes/lobby';
import User from './routes/user';
import SignIn from './routes/signIn';
import SignUp from './routes/signUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="lobby" element={<Lobby />} />
        <Route path="game" element={<Game />} />
        <Route path="user" element={<User />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

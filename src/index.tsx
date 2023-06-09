import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './pages/App';
import reportWebVitals from './reportWebVitals';

import express from "express";
import { Application, Response, Request } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

const port = 8080;

app.listen(port, () => {
    console.log("Server running on port" + port);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your pages, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

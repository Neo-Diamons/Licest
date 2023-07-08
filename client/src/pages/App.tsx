import React from "react";
import './App.css';

import { List } from "./List";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Licest</h1>
      </div>
      <div className="App-body">
        <List name="In Progress" status="Current" />
        <List name="Upcoming" status="Upcoming" />
        <List name="Finished" status="Finished" />
      </div>
    </div>
  );
}

export default App;

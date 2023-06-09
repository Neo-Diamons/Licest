import React from 'react';
import './App.css';

import { List } from "./List";
import { Data } from "./data";

type DataType = {
  id: number;
  name: string;
  image: string;
  season: number;
  current: boolean;
  release: string | null;
}

function App() {
  let listCurrent: DataType[] = [];
  let listAnnounce: DataType[] = [];
  let listFinish: DataType[] = [];

  Data.forEach((data) => {
    if (data.current) {
      listCurrent.push(data);
    } else if (data.release !== null) {
      listAnnounce.push(data);
    } else {
      listFinish.push(data);
    }
  });

  return (
    <div className="App">
      <div className="App-header">
        <h1>Licest</h1>
      </div>
      <div className="App-body">
        <List name="In Progress" list={listCurrent} />
        <List name="Announce" list={listAnnounce} />
        <List name="Finish" list={listFinish} />
      </div>
    </div>
  );
}

export default App;

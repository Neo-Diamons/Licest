import React, { useEffect } from "react";
import './App.css';

import { List } from "./List";

type DataType = {
  id: number;
  name: string;
  image: string;
  season: number;
  current: boolean;
  publish: string | null;
}

function App() {
  let listCurrent: DataType[] = [];
  let listAnnounce: DataType[] = [];
  let listFinish: DataType[] = [];

  const [listData, setListData] = React.useState<DataType[]>([]);

  const fetchData = () => {
    fetch("http://localhost:8080/cards")
      .then(response => {
        return response.json()
      }).then(data => {
        setListData(data)
      }).catch(function(error) {
        console.log('Request failed', error)
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

  listData.forEach((data) => {
    if (data.current) {
      listCurrent.push(data);
    } else if (data.publish !== null) {
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

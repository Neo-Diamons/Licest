import React from "react";
import './App.css';

import { List } from "./List";
import { CardsSettings } from "./CardsSettings";
import { ReactComponent as Plus } from '../svg/plus.svg';

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Licest</h1>
        <button className="App-header-button" onClick={handleClick}>
            <Plus className="App-header-button-plus" />
        </button>
      </div>
      <div className="App-body">
        <List name="In Progress" status="Current" />
        <List name="Upcoming" status="Upcoming" />
        <List name="Finished" status="Finished" />
      </div>
        {open ? (
          <CardsSettings open={open} setOpen={handleClick} />
        ) : null}
    </div>
  );
}

export default App;

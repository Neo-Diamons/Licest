import React from "react";
import "./List.css";

import { Cards } from './Cards';
import { ReactComponent as Arrow } from '../svg/arrow.svg';

type DataType = {
  id: number;
  name: string;
  image: string;
  season: number;
  current: boolean;
  publish: string | null;
}

type Props = {
  name: string;
  list: DataType[];
}

export const List = (props: Props) => {
  const [open, setOpen] = React.useState(true);
  const rotate = open ? "rotate(0deg)" : "rotate(-90deg)";

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <div className="List-category">
      <div className="List-category-header">
        <button className="List-category-header-button" onClick={handleClick}>
          <Arrow className="List-category-header-arrow" style={{transform: rotate}} />
        </button>
        <h2>{props.name}</h2>
      </div>
      {open ? (
        <div className="List-category-items">
          {props.list.map((data) => (
            <Cards key={data.name} data={data} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

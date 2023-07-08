import React, {useEffect} from "react";
import "./List.css";

import { Cards } from './Cards';
import { DataType } from "../types/dataType";
import { ReactComponent as Arrow } from '../svg/arrow.svg';

export const List = (props: { name: string, status: string }) => {
  const [open, setOpen] = React.useState(true);
  const rotate = open ? "rotate(0deg)" : "rotate(-90deg)";

  const handleClick = () => {
    setOpen(!open);
  }

  const [listData, setListData] = React.useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = () => {
        fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/cards/status/${props.status}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(json => setListData(json))
            .catch(err => console.log(err));
    }

    fetchData()
  }, [props.status])

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
          {listData.map((data) => (
            <Cards key={data.name} data={data} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

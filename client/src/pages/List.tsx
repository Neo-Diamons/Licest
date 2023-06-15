import React, {useEffect} from "react";
import "./List.css";

import { Cards } from './Cards';
import { DataType } from "../types/DataType";
import { ReactComponent as Arrow } from '../svg/arrow.svg';

export const List = (props: { name: string, request: string }) => {
  const [open, setOpen] = React.useState(true);
  const rotate = open ? "rotate(0deg)" : "rotate(-90deg)";

  const handleClick = () => {
    setOpen(!open);
  }

  const [listData, setListData] = React.useState<DataType[]>([]);

  const fetchData = () => {
    fetch("http://localhost:8080/" + props.request)
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
  }, [fetchData])

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

import React from "react";
import "./Cards.css";

import { DataType } from "../types/DataType";

export const Cards = (props: { data: DataType }) => {
  let description;

  if (props.data.publish !== null) {
    description = <p>{props.data.publish}</p>
  }  else if (props.data.season !== 1) {
    description = <p>Season {props.data.season}</p>
  }

  return (
    <div className="Card">
      <div className="Card-image">
        <img src={props.data.image} alt="placeholder" />
      </div>
      <div className="Card-content">
        <h3>{props.data.name}</h3>
        {description}
      </div>
    </div>
  );
}

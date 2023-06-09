import React from "react";
import "./Cards.css";

type DataType = {
  name: string;
  image: string;
  season: number;
  release: string | null;
}

type Props = {
  data: DataType;
}

export const Cards = (props: Props) => {
  let description;

  if (props.data.release !== null) {
    description = <p>{props.data.release}</p>
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
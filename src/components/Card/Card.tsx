import React from "react";
import "./Card.css";

interface Props{
  imageSource: string | undefined;
  species: string;
  piece: number;
}

const card = (props: Props) => {
  return (
    <div className="card">
      <img src={props.imageSource} alt="Avatar" className="img"/>
      <div className="text">
        <h4>
          <b>{props.species}</b>
        </h4>
        <p>{props.piece} piece</p>
      </div>
    </div>
  );
};

export default card;

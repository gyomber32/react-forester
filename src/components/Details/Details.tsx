import React from "react";
import "./Details.css";

import img from "../../assets/oak_seedling.jpg";

interface Props {
  title: string;
  img: string;
  piece: number;
  date: string;
}

const detailsModal = (props: Props) => {
  return (
    <div className="modal_container">
      <header className="modal_title">{props.title}</header>
      <img src={props.img} alt="" className="modal_img" />
      <div className="modal_content">
        <p className="modal_paragraph">Piece: {props.piece}</p>
        <p className="modal_paragraph">Date planted: {props.date}</p>
        <p className="modal_paragraph">Days growing: 165 days</p>
      </div>
    </div>
  );
};

export default detailsModal;

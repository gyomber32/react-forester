import React from "react";
import "./DetailsModal.css";

interface Props {
  title: string;
  img: string;
  piece: number;
  date: string;
}

function parseData(dateString: string): number {
  const milliseconds = Date.parse(dateString);
  const millisecondsUpToday = Date.parse(new Date().toString());
  const days = Math.floor(
    (millisecondsUpToday - milliseconds) / (24 * 60 * 60 * 1000)
  );
  return days;
}

const detailsModal = (props: Props) => {
  return (
    <div className="modal_container">
      <header className="modal_title">{props.title}</header>
      <img src={props.img} alt="" className="modal_img" />
      <div className="modal_content">
        <p className="modal_paragraph">Piece: {props.piece}</p>
        <p className="modal_paragraph">Date planted: {props.date}</p>
        <p className="modal_paragraph">Days growing: {parseData(props.date)} days</p>
      </div>
    </div>
  );
};

export default detailsModal;

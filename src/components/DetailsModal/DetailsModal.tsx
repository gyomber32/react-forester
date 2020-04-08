import React from "react";
import styles from "./DetailsModal.module.scss";

type Props = {
  title: string;
  img: string;
  piece: number | null;
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

const DetailsModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.DetailsModal}>
      <header className={styles.DetailsModal_title}>{props.title}</header>
      <img src={props.img} alt="" className={styles.DetailsModal_img} />
      <div className={styles.DetailsModal_content}>
        <p className={styles.DetailsModal_content_paragraph}>
          Piece: {props.piece}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Date planted: {props.date}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Days growing: {parseData(props.date)} days
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;

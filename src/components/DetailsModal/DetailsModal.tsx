import React from "react";
import styles from "./DetailsModal.module.scss";

type Props = {
  species: string;
  piece: number | null;
  date_planted: Date;
  picture: string;
}

function parseData(date: Date): number {
  const milliseconds = date.getTime();
  const millisecondsUpToday = Date.parse(new Date().toString());
  const days = Math.floor(
    (millisecondsUpToday - milliseconds) / (24 * 60 * 60 * 1000)
  );
  return days;
}

const DetailsModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.DetailsModal}>
      <header className={styles.DetailsModal_title}>{props.species}</header>
      <img src={props.picture} alt="" className={styles.DetailsModal_img} />
      <div className={styles.DetailsModal_content}>
        <p className={styles.DetailsModal_content_paragraph}>
          Piece: {props.piece}
        </p>
       <p className={styles.DetailsModal_content_paragraph}>
          Date planted: {props.date_planted.toDateString()}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Days growing: {parseData(props.date_planted)} days
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;

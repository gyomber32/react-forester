import React from "react";

import parseDate from "../../utils/ParseDate";

import styles from "./DetailsModal.module.scss";

type Props = {
  species: string;
  piece: number;
  datePlanted: Date;
  picture: string;
};

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
          Date planted: {props.datePlanted.toDateString()}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Growing for: {parseDate(props.datePlanted)}
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;

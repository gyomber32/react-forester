import React from "react";

import parseDate from "../../utils/ParseDate";

import noContent from "../../assets/no-content.png";

import styles from "./DetailsModal.module.scss";

type Props = {
  species: string;
  plantedQuantity: number;
  survivedQuantity: number;
  datePlanted: string;
  picture: string;
};

const DetailsModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.DetailsModal}>
      <header className={styles.DetailsModal_title}>{props.species}</header>
      {props.picture ? (
        <img src={props.picture} alt="" className={styles.DetailsModal_img} />
      ) : (
        <img src={noContent} alt="" className={styles.DetailsModal_img} />
      )}
      <div className={styles.DetailsModal_content}>
        <p className={styles.DetailsModal_content_paragraph}>
          Planted quantity: {props.plantedQuantity}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Survived quantity: {props.survivedQuantity}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Date planted: {props.datePlanted}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Growing for: {parseDate(props.datePlanted)}
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;

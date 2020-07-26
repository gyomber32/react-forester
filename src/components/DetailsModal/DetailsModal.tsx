import React from "react";

import noContent from "../../assets/no-content.png";

import Tree from "../../models/types/Tree";
import Seedling from "../../models/types/Seedling";

import styles from "./DetailsModal.module.scss";

type Props = {
  item: Tree | Seedling
  openConfirmationModal: () => void;
};

const DetailsModal: React.FC<Props> = ({item, openConfirmationModal}) => {
  return (
    <div className={styles.DetailsModal}>
      <header className={styles.DetailsModal_header}>
        <button
          className={styles.DetailsModal_deleteButton}
          onClick={openConfirmationModal}
        >
          <i className={styles.DetailsModal_deleteButton___icon}></i>
        </button>
        <div className={styles.DetailsModal_title}>{item.species}</div>
      </header>
      {item.picture ? (
        <img src={item.picture} alt="" className={styles.DetailsModal_img} />
      ) : (
        <img src={noContent} alt="" className={styles.DetailsModal_img} />
      )}
      <div className={styles.DetailsModal_content}>
        <p className={styles.DetailsModal_content_paragraph}>
          Planted quantity: {item.plantedQuantity}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Survived quantity: {item.survivedQuantity}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Date planted: {item.datePlanted}
        </p>
        <p className={styles.DetailsModal_content_paragraph}>
          Growing for: {item.daysInSoil}
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;

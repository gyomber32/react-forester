import React from "react";

import noContent from "../../assets/no-content.png";

import Tree from "../../models/types/Tree";
import ActionButtons from "../ActionButtons/ActionButtons";
import Seedling from "../../models/types/Seedling";
import styles from "./DetailsModal.module.scss";

type Props = {
  type: string;
  item: Tree | Seedling;
  handleMigrate: () => void;
  handleDelete: () => void;
  handleUpdate: () => void;
};

const DetailsModal: React.FC<Props> = ({
  type,
  item,
  handleMigrate,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <div className={styles.DetailsModal}>
      <header className={styles.DetailsModal_Header}>
        <div className={styles.DetailsModal_ActionButtons}>
            <ActionButtons
              type={type}
              onDelete={handleDelete}
              onMigrate={handleMigrate}
              onUpdate={handleUpdate}
            ></ActionButtons>
        </div>

        <div className={styles.DetailsModal_Title}>{item.species}</div>
      </header>
      {item.picture ? (
        <img src={item.picture} alt="" className={styles.DetailsModal_Img} />
      ) : (
        <img src={noContent} alt="" className={styles.DetailsModal_Img} />
      )}
      <div className={styles.DetailsModal_Content}>
        <p className={styles.DetailsModal_Content_Paragraph}>
          Planted quantity: {item.plantedQuantity}
        </p>
        <p className={styles.DetailsModal_Content_Paragraph}>
          Survived quantity: {item.survivedQuantity}
        </p>
        <p className={styles.DetailsModal_Content_Paragraph}>
          Date planted: {item.datePlanted}
        </p>
        <p className={styles.DetailsModal_Content_Paragraph}>
          Growing for: {item.daysInSoil}
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;

import React from "react";

import styles from "./ConfirmationModal.module.scss";

type Props = {
  onYes: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.ConfirmationModal}>
      <div className={styles.ConfirmationModal_text}>
        Are you sure you want to delete?
      </div>
      <div className={styles.ConfirmationModal_formActions}>
        <button
          className={styles.ConfirmationModal_formActions_button}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button
          className={styles.ConfirmationModal_formActions_button}
          onClick={props.onYes}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;

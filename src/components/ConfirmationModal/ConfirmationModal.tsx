import React from "react";

import styles from "./ConfirmationModal.module.scss";

type Props = {
  actionType: string;
  itemType: string;
  onYes: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
  actionType,
  itemType,
  onCancel,
  onYes,
}) => {
  return (
    <div className={styles.ConfirmationModal}>
      {actionType === "delete" && (
        <div className={styles.ConfirmationModal_text}>
          Are you sure you want to delete this {itemType}?
        </div>
      )}
      {actionType === "migrate" && (
        <div className={styles.ConfirmationModal_text}>
        Are you sure you want to migrate these {itemType}s to {itemType === 'seed' ? 'seedlings' : 'trees'}?
      </div>
      )}
      <div className={styles.ConfirmationModal_formActions}>
        <button
          className={styles.ConfirmationModal_formActions_button}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={styles.ConfirmationModal_formActions_button}
          onClick={onYes}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;

import React from "react";
import classNames from "classnames";
import styles from "./ActionButtons.module.scss";

type Props = {
  onMigrate: () => void;
  onDelete: () => void;
  onUpdate: () => void;
};

const ActionButtons: React.FC<Props> = ({ onMigrate, onUpdate, onDelete }) => (
  <div className={styles.ActionButtons}>
    <button
      className={classNames([styles.Button, styles.Button_UpdateButton])}
      onClick={onUpdate}
    >
      <i
        className={classNames([
          styles.Button___Icon,
          styles.Button___Icon_Update,
        ])}
      ></i>
    </button>
    <button
      className={classNames([styles.Button, styles.Button_MigrateButton])}
      onClick={onMigrate}
    >
      <i
        className={classNames([
          styles.Button___Icon,
          styles.Button___Icon_Migrate,
        ])}
      ></i>
    </button>
    <button
      className={classNames([styles.Button, styles.Button_DeleteButton])}
      onClick={onDelete}
    >
      <i
        className={classNames([
          styles.Button___Icon,
          styles.Button___Icon_Delete,
        ])}
      ></i>
    </button>
  </div>
);

export default ActionButtons;

import React, { Fragment } from "react";

import styles from "./TableActionButton.module.scss";

enum ButtonTypes {
  Update,
  Delete,
}

type Props = {
  click: any;
  type: ButtonTypes;
};

const TableActionButton: React.FC<Props> = (props) => (
  <Fragment>
    {props.type === ButtonTypes.Update && (
      <button className={styles.TableActionButton_deleteButton} onClick={props.click}>
        <i className={styles.TableActionButton_deleteButton___icon}></i>
      </button>
    )}
    {props.type === ButtonTypes.Delete && (
      <button className={styles.TableActionButton_updateButton} onClick={props.click}>
        <i className={styles.TableActionButton_updateButton___icon}></i>
      </button>
    )}
  </Fragment>
);

export default TableActionButton;

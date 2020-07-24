import React from "react";

import noContent from "../../assets/no-content.png";

import styles from "./Card.module.scss";
import Seedling from "../../models/types/Seedling";
import Tree from "../../models/types/Tree";

type Props = {
  item: Tree | Seedling;
  click: any;
};

const Card: React.FC<Props> = ({ item, click }) => {
  return (
    <div className={styles.Card} onClick={click}>
      {console.log("Card rerender")}
      <img
        src={item.picture ? item.picture : noContent}
        alt="Avatar"
        className={styles.Card_img}
      />
      <div className={styles.Card_content}>
        <h4>
          <b>{item.species}</b>
        </h4>
        <p>{item.survivedQuantity} piece</p>
      </div>
    </div>
  );
};

export default React.memo(Card, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});

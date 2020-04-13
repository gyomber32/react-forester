import React from "react";
import styles from "./Card.module.scss";

type Props = {
  species: string;
  piece: number | null;
  picture: string;
  click: any;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={styles.Card} onClick={props.click}>
      <img src={props.picture} alt="Avatar" className={styles.Card_img} />
      <div className={styles.Card_content}>
        <h4>
          <b>{props.species}</b>
        </h4>
        <p>{props.piece} piece</p>
      </div>
    </div>
  );
};

export default Card;

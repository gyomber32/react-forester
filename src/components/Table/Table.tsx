import React from "react";
import Seed from "../../models/types/Seed";

import styles from "./Table.module.scss";

type Props = {
  seeds: Seed[];
};

const Table: React.FC<Props> = (props) => {

  const columns = ["Species", "Seeded quantity", "Brairded quantity", "Date seeded", "In soil for"];

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          {columns.map((column, index) => {
            return <th key={index}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.seeds.map((seed, index) => {
          return (
            <tr key={index}>
              <th>{seed.species}</th>
              <th>{seed.seededQuantity}</th>
              <th>{seed.brairdedQuantity}</th>
              <th>{seed.dateSeeded}</th>
              <th>{seed.daysInSoil}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

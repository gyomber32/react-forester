import React from "react";
import Seed from "../../models/types/Seed";

import TableActionButton from "./TableActionButton/TableActionButton";

import styles from "./Table.module.scss";

enum ButtonTypes {
  Update,
  Delete,
}

type Props = {
  seeds: Seed[];
  onDelete: (seed: Seed) => void;
  onUpdate: () => void;
};

const Table: React.FC<Props> = ({ seeds, onDelete, onUpdate }) => {
  const columns = [
    "Species",
    "Seeded quantity",
    "Brairded quantity",
    "Date seeded",
    "In soil for",
    "Actions",
  ];

  return (
    <table className={styles.Table}>
      {console.log("Table rerender")}
      <thead>
        <tr>
          {columns.map((column, index) => {
            return <th key={index}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {seeds.map((seed) => {
          return (
            <tr key={seed._id}>
              <th>{seed.species}</th>
              <th>{seed.seededQuantity}</th>
              <th>{seed.brairdedQuantity}</th>
              <th>{seed.dateSeeded}</th>
              <th>{seed.daysInSoil}</th>
              <th>
                <TableActionButton
                  type={ButtonTypes.Update}
                  click={() => onDelete(seed)}
                />
                <TableActionButton
                  type={ButtonTypes.Delete}
                  click={() => onUpdate}
                />
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(Table, (prevProps, nextProps) => {
  return prevProps.seeds.length === nextProps.seeds.length;
});

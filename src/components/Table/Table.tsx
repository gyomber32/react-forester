import React from "react";
import ActionButtons from "../ActionButtons/ActionButtons";
import Seed from "../../models/types/Seed";
import styles from "./Table.module.scss";

type Props = {
  seeds: Seed[];
  handleMigrate: () => void;
  handleUpdate: () => void;
  handleDelete: (seed: Seed) => void;
};

const Table: React.FC<Props> = ({
  seeds,
  handleMigrate,
  handleUpdate,
  handleDelete,
}) => {
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
                <ActionButtons
                  onDelete={() => handleDelete(seed)}
                  onMigrate={handleMigrate}
                  onUpdate={handleUpdate}
                ></ActionButtons>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(Table);

import React from "react";
import { useTable } from "react-table";

import Seed from "../../models/types/Seed";

import styles from "./Table.module.scss";

type Props = {
  seeds: Seed[];
};

const Table: React.FC<Props> = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Species",
        accessor: "species",
      },
      {
        Header: "Piece",
        accessor: "piece",
      },
      {
        Header: "Date seeded",
        accessor: "dateSeeded",
      },
    ],
    []
  );

  const formatDate = () => {
    let dataTemp: any = [];
    props.seeds.forEach((seed, index) => {
      dataTemp.push(seed);
      dataTemp[index].dateSeeded = dataTemp[index].dateSeeded.toDateString();
    });
    return dataTemp;
  };

  const data = React.useMemo(() => [...formatDate()], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className={styles.Table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

import React from "react";
import { useTable } from "react-table";

import "./Table.css";

const Table = (props: any) => {
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
        accessor: "date",
      },
    ],
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => [...props.seeds], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
      <table {...getTableProps()}>
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
  );
};

export default Table;

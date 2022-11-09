import axios from "axios";
import React, { useEffect,useState,useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import styles from "./Leagues.module.css";


const Table = ({ columns, data, initialState }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table style={{backgroundColor: 'gray'}} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span >
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody  {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            if (i==0){
              prepareRow(row);
              return (
                <tr style={{backgroundColor: 'green'}}{...row.getRowProps()}>
                  {row.cells.map((cell) => {
                   return (
                        <td style={{border: '1px solid black'}} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
  
  
                  })}
                </tr>
              );
            }
            else{
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                   return (
                        <td style={{border: '1px solid black'}} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
  
  
                  })}
                </tr>
              );
            }

          })}
        </tbody>
      </table>
      <br />
    </>
  );
}

const TeamsTable = (props) => {
  console.log(props.data)
  const data = useMemo(() => props.tableList, [props.tableList])
  const columns = useMemo(
    () => [
      {
        Header: "Klub",
        accessor: "clubName", // accessor is the "key" in the data
      },
      {
        Header: "MP",
        accessor: "playedGames",
      },
      {
        Header: "W",
        accessor: "wonGames",
      },
      {
        Header: "D",
        accessor: "drawGames",
      },
      {
        Header: "L",
        accessor: "lostGames",
      },
      {
        Header: "GS",
        accessor: "goalsShot",
      },
      {
        Header: "GL",
        accessor: "goalsLost",
      },
      {
        Header: "GD",
        accessor: "goalsDif",
      },
      {
        Header: "PTS",
        accessor: "points",
      },
    ],
    []
  );

  return (
    <div>
    <h4>
      {props.data.name}
  </h4>

    <div className={styles.LeagueTable}>
      <Table
        columns={columns}
        data={data}
        initialState={{
          sortBy: [
            {
              id: "points",
              desc: true
            },
          ]
        }}
      />
    </div>
    </div>
  );
};

export default TeamsTable;

import React, { useMemo } from "react";
import { useSortBy, useTable } from "react-table";

const Table = ({ columns, data, initialState }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState,
      },
      useSortBy
    );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table className="bg-zinc-400" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th  className="bg-gray-100 m-2 p-2 w-10" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
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
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            if (i === 0) {
              prepareRow(row);
              return (
                <tr className="bg-lime-400" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td 
                        className="border border-black w-10 max-w-full"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            } else {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="border border-black"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
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
};

function TeamsTable({ league, matchList, tableList }) {
  const data = useMemo(() => tableList, [tableList]);
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
      <h4>{league.name}</h4>

      <div className="flex justify-center m-2 p-2">
        <Table
          columns={columns}
          data={data}
          initialState={{
            sortBy: [
              {
                id: "points",
                desc: true,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default TeamsTable;

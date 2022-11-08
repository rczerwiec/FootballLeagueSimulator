import axios from "axios";
import React, { useEffect,useState,useMemo } from "react";
import { useTable } from "react-table";

const TeamsTable = (props) => {
  
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
  
  const tableInstance = useTable({ columns, data,initialState:{
    sortBy:[{ }]
  } });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div>
      Tabela druzyn
      <table {...getTableProps()}>
     <thead>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
   </table>
    </div>
  );
};

export default TeamsTable;

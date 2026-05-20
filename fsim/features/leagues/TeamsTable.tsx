"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

interface TableRow {
  clubName: string;
  playedGames: number;
  wonGames: number;
  drawGames: number;
  lostGames: number;
  goalsShot: number;
  goalsLost: number;
  goalsDif: number;
  points: number;
}

function TeamsTable({
  league,
  tableList,
}: {
  league: { name: string };
  matchList?: unknown;
  tableList: TableRow[];
}) {
  const data = useMemo(() => tableList ?? [], [tableList]);
  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      { header: "Klub", accessorKey: "clubName" },
      { header: "MP", accessorKey: "playedGames" },
      { header: "W", accessorKey: "wonGames" },
      { header: "D", accessorKey: "drawGames" },
      { header: "L", accessorKey: "lostGames" },
      { header: "GS", accessorKey: "goalsShot" },
      { header: "GL", accessorKey: "goalsLost" },
      { header: "GD", accessorKey: "goalsDif" },
      { header: "PTS", accessorKey: "points" },
    ],
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "points", desc: true },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <h4>{league.name}</h4>
      <div className="flex justify-center m-2 p-2">
        <table className="bg-zinc-400">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, colIndex) => (
                  <th
                    key={header.id}
                    className="bg-gray-100 m-2 p-2 w-10"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.slice(0, 20).map((row, i) => (
              <tr
                key={row.id}
                className={i === 0 ? "bg-lime-400" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-black w-10 max-w-full">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamsTable;

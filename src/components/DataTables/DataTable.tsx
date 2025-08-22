import React, { useState } from "react";

// Column interface
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

// Props interface
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  // Sorting handler
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === col.dataIndex &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Row selection handler
  const toggleRowSelection = (row: T) => {
    const updated = new Set(selectedRows);
    if (updated.has(row.id)) {
      updated.delete(row.id);
    } else {
      updated.add(row.id);
    }
    setSelectedRows(updated);
    if (onRowSelect) {
      onRowSelect(data.filter((d) => updated.has(d.id)));
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      {loading ? (
        <div className="p-4 text-center" role="status" aria-live="polite">
          Loading data...
        </div>
      ) : data.length === 0 ? (
        <div className="p-4 text-center" role="status" aria-live="polite">
          No data available.
        </div>
      ) : (
        <table
          className="w-full border-collapse border border-gray-300 text-sm"
          aria-label="Data Table"
        >
          <thead className="bg-gray-100">
            <tr>
              {selectable && <th className="border p-2">Select</th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={`border p-2 ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                  aria-sort={
                    sortConfig?.key === col.dataIndex
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  {col.title}
                  {col.sortable && sortConfig?.key === col.dataIndex && (
                    <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {selectable && (
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleRowSelection(row)}
                      aria-label={`Select row ${row.id}`}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="border p-2">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;

import React, { useState } from "react";

interface TableRow {
  milestone: string;
  goalValue: string;
  unit: string;
}

const MileStoneTable: React.FC = () => {
  const [rows, setRows] = useState<TableRow[]>([
    { milestone: "1", goalValue: "", unit: "" },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { milestone: `${rows.length + 1}`, goalValue: "", unit: "" },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof TableRow,
    value: string,
  ) => {
    const newRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return {
          ...row,
          [field]: value,
        };
      }
      return row;
    });

    setRows(newRows);
  };

  return (
    <div className="flex flex-col">
      <table className="min-w-full">
        <thead className="rounded-md border bg-gray-50 shadow-sm">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
              Milestone
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
              Goal/Value
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
              Unit
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.milestone}>
              <td>
                <input
                  type="text"
                  value={row.milestone}
                  readOnly
                  className="block w-full rounded-sm border border-gray-300 py-2 text-center sm:text-sm" // Add text-center for alignment
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.goalValue}
                  placeholder=" Ex: 100"
                  required
                  onChange={(e) =>
                    handleChange(index, "goalValue", e.target.value)
                  }
                  className="block w-full rounded-sm border border-gray-300 py-2 sm:text-sm"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.unit}
                  required
                  placeholder=" Ex: books"
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                  className="block w-full rounded-sm border border-gray-300 py-2 sm:text-sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          onClick={addRow}
          className="mt-2 rounded bg-gray-500 px-10 py-1 font-medium text-white hover:bg-gray-600"
        >
          Add Row
        </button>
      </div>
    </div>
  );
};

export default MileStoneTable;

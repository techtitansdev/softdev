import React, { useState, useEffect } from "react";

export interface TableRow {
  id: string | undefined;
  milestone: string;
  value: number;
  unit: string;
  description: string;
  date: Date | null;
  done: boolean;
  created: Date;
  updated: Date;
  fundraiserId: string;
}

interface MilestoneTableEditProps {
  onRowDataChange: (rows: TableRow[]) => void;
  existingMilestones: TableRow[];
  setMilestoneUpdated: (updated: boolean) => void; // Added prop for setMilestoneUpdated
}

const MilestoneTableEdit: React.FC<MilestoneTableEditProps> = ({
  onRowDataChange,
  existingMilestones,
  setMilestoneUpdated, // Destructuring the new prop
}) => {
  const [rows, setRows] = useState<TableRow[]>([]);

  useEffect(() => {
    if (existingMilestones.length > 0) {
      const parsedRows = existingMilestones.map((row) => ({
        ...row,
        date: row.date ? new Date(row.date) : null,
      }));
      setRows(parsedRows);
    }
  }, [existingMilestones]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        milestone: `${rows.length + 1}`,
        value: 0,
        unit: "",
        description: "",
        id: undefined,
        date: null,
        done: false,
        created: new Date(),
        updated: new Date(),
        fundraiserId: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof TableRow,
    value: string | boolean | number | Date | null,
  ) => {
    console.log(`Updating row ${index} - field ${field} to value ${value}`);
    const newRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return {
          ...row,
          [field]: field === "done" ? value === "true" : value,
        };
      }
      return row;
    });

    setRows(newRows);
    onRowDataChange(newRows);
    setMilestoneUpdated(true); // Trigger the update flag
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
              Description
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
              Status
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
                  className="block w-full rounded-sm border border-gray-300 py-2 text-center sm:text-sm"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.value || ""}
                  placeholder="Ex: 100"
                  required
                  onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = Number(value);

                    if (value === "" || numericValue > 0) {
                      handleChange(index, "value", numericValue);
                    }
                  }}
                  className="block w-full rounded-sm border border-gray-300 py-2 pl-2 sm:text-sm"
                  min={1}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.unit}
                  required
                  placeholder=" Ex: books"
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                  className="block w-full rounded-sm border border-gray-300 py-2 pl-2 sm:text-sm"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  required
                  placeholder=" sample description"
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="block w-full rounded-sm border border-gray-300 py-2 pl-2 sm:text-sm"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={formatDate(row.date)}
                  required
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    handleChange(
                      index,
                      "date",
                      isNaN(newDate.getTime()) ? null : newDate,
                    );
                  }}
                  className="block w-full rounded-sm border border-gray-300 py-2 pl-2 sm:text-sm"
                />
              </td>
              <td>
                <select
                  value={row.done.toString()}
                  onChange={(e) => handleChange(index, "done", e.target.value)}
                  className={`block w-full rounded-sm border py-2 pl-2 sm:text-sm ${
                    row.done ? "bg-green-300" : "bg-yellow-300"
                  }`}
                >
                  <option value="false">On Going</option>
                  <option value="true">Reached</option>
                </select>
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

export default MilestoneTableEdit;

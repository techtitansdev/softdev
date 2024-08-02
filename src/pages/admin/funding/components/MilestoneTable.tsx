import React, { useEffect, useState } from "react";

export interface TableRow {
  id: string | undefined;
  milestone: string;
  value: number;
  unit: string;
  description: string;
  date: Date;
  done: boolean;
}

interface MileStoneTableProps {
  onRowDataChange: (rows: TableRow[]) => void;
  existingMilestone: TableRow[];
}

const MileStoneTable: React.FC<MileStoneTableProps> = ({
  onRowDataChange,
  existingMilestone,
}) => {
  const [rows, setRows] = useState<TableRow[]>([]);

  useEffect(() => {
    if (existingMilestone.length > 0) {
      setRows(existingMilestone);
    }
  }, [existingMilestone]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        milestone: `${rows.length + 1}`,
        value: 0,
        unit: "",
        description: "",
        id: undefined,
        date: new Date(),
        done: false,

      },
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
    onRowDataChange(newRows);
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
                  onChange={(e) =>
                    handleChange(index, "milestone", e.target.value)
                  }
                  className="block w-full rounded-sm border border-gray-300 py-2 text-center sm:text-sm"
                  data-testid="milestone-title-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.value}
                  placeholder="Ex: 100"
                  required
                  onChange={(e) => handleChange(index, "value", e.target.value)}
                  className="block w-full rounded-sm border border-gray-300 py-2 pl-2 sm:text-sm"
                  data-testid="funding-goal-input"
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
                  data-testid="milestone-unit-input"
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
                  className="block w-full rounded-sm border border-gray-300 py-2 sm:text-sm pl-2"
                  data-testid="milestone-description-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.description}
                  required
                  placeholder="mm/dd/yyyy"
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="block w-full rounded-sm border border-gray-300 py-2 sm:text-sm pl-2"
                  data-testid="milestone-description-input"
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
                  className="block w-full rounded-sm border border-gray-300 py-2 sm:text-sm pl-2"
                  data-testid="milestone-description-input"
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

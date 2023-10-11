import React, { useState, useEffect } from 'react';
import { useTable } from "react-table";

const Table = () => {
  const [data, setData] = useState([
    { id: 1, columns: ['', ''] },
    { id: 2, columns: ['', ''] },
    { id: 3, columns: ['', ''] },
  ]);

  const handleCellChange = (id, columnIndex, value) => {
    const newData = data.map(item => {
      if (item.id === id) {
        const newColumns = [...item.columns];
        newColumns[columnIndex] = value;
        return { ...item, columns: newColumns };
      }
      return item;
    });
    setData(newData);
  };

  const handlePasteFromClipboard = event => {
    navigator.clipboard.readText().then(text => {
      const rows = text.split('\n');
      const newData = [...data];

      rows.forEach((row, rowIndex) => {
        const columns = row.split('\t');
        columns.forEach((value, columnIndex) => {
          if (newData[rowIndex] && newData[rowIndex].columns[columnIndex] !== undefined) {
            newData[rowIndex].columns[columnIndex] = value;
          }
        });
      });

      setData(newData);
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = event => {
    if (event.ctrlKey && event.key === 'v') {
      handlePasteFromClipboard(event);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {item.columns.map((value, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="text"
                    value={value}
                    onChange={e => handleCellChange(item.id, columnIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import { HeaderGroup, UseSortByColumnProps } from 'react-table';

// ...

{headerGroup.headers.map((column: HeaderGroup<any> & { getSortByToggleProps: () => UseSortByColumnProps<any> }) => (
  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
    {column.render('Header')}
    <span>
      {column.isSorted ? (
        column.isSortedDesc ? ' 🔽' : ' 🔼'
      ) : ''}
    </span>
  </th>
))}

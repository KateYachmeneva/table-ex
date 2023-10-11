import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { v4 as uuidv4 } from 'uuid'; 
import { DeleteOutlined } from '@ant-design/icons';


const EditableTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newRow, setNewRow] = useState({
    id: uuidv4(),
    depth: '',
    CX: '',
    CY: '',
    CZ: '',
  });

  const handleAddRow = () => {
    setTableData([...tableData, newRow]);
    setNewRow({
      id: uuidv4(),
      depth: '',
      CX: '',
      CY: '',
      CZ: '',
    });
  };
  const handleCopy = () => {
    const copiedText = rows
      .map((row) =>
        columns
          .slice(1, 10) // Выбираем только колонки с инпутами
          .map((column) => row.values[column.accessor])
          .join('\t')
      )
      .join('\n');

    navigator.clipboard.writeText(copiedText).then(
      () => {
        console.log('Data copied to clipboard');
      },
      (err) => {
        console.error('Unable to copy data to clipboard', err);
      }
    );
  };
  const handleCopyLast = () => {
    const lastRow = rows[rows.length - 1];

    const copiedText = columns
      .slice(1, 10) // Выбираем только колонки с инпутами
      .map((column) => lastRow.values[column.accessor])
      .join('\t');

    navigator.clipboard.writeText(copiedText).then(
      () => {
        console.log('Last row data copied to clipboard');
      },
      (err) => {
        console.error('Unable to copy data to clipboard', err);
      }
    );
  };
//raw selection

const handleRowSelect = (row) => {
    console.log(row)
    if (selectedRows.includes(row)) {
       
      setSelectedRows(selectedRows.filter((selectedRow) => selectedRow !== row));
      console.log(selectedRows);
    } else {
      setSelectedRows([...selectedRows, row]);
      console.log(selectedRows)
    }
  };
  
  const handleCopySelected = () => {
   
    const copiedText = rows
    .filter((row) => selectedRows.includes(row))
    .map((row) =>
      columns
        .slice(1,) // Выбираем только колонки с инпутами
        .map((column) => row.values[column.accessor])
        .join('\t')
    )
    .join('\n');
  
    navigator.clipboard.writeText(copiedText).then(
      () => {
        console.log('Selected rows data copied to clipboard');
      },
      (err) => {
        console.error('Unable to copy data to clipboard', err);
      }
    );
  };
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Depth',
        accessor: 'depth',
        Cell: ({ row, value }) => (
            <input
              value={value}
              onChange={(e) => handleCellChange(row, 'depth', e.target.value)}
        
            />
          ),
      },
      {
        Header: 'CX',
        accessor: 'CX',
        Cell: ({ row, value }) => (
          <input
            value={value}
            onChange={(e) => handleCellChange(row, 'CX', e.target.value)}
          
          />
        ),
      },
      {
        Header: 'CY',
        accessor: 'CY',
        Cell: ({ row, value }) => (
          <input
            value={value}
            onChange={(e) => handleCellChange(row, 'CY', e.target.value)}
          />
        ),
      },
      {
        Header: 'CZ',
        accessor: 'CZ',
        Cell: ({ row, value }) => (
          <input
            value={value}
            onChange={(e) => handleCellChange(row, 'CZ', e.target.value)}
          />
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
            <DeleteOutlined  type="delete" className="ml10" onClick={() => handleDeleteRow(row)}/>
     
        ),
      },
    ],
    []
  );
  
  //изменение
  
  const handleCellChange = (row, field, value) => {
    setTableData((prevData) => {
        const updatedData = prevData.map((item) =>
          item.id === row.original.id ? { ...item, [field]: value } : item
        );
        return updatedData;
      });
  };

  const handleDeleteRow = (row) => {
    setTableData((prevData) => {
        const updatedData = prevData.filter((item) => item.id !== row.original.id);
        console.log(updatedData); // Вывод обновленных данных в консоль
        return updatedData;
      });
    // Здесь вы можете добавить логику для отправки данных на сервер
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useSortBy
  );
  
  
  
  return (
    <div>
    <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleCopy}>Copy all</button>
        <button onClick={handleCopyLast}>Copy Last </button>
        <button onClick={handleCopySelected}>copy selected</button>
      {/* <button onClick={handlePaste}>Paste</button>  */}
      <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
                  <td>
          <input
            type="checkbox"
            checked={selectedRows.includes(row)}
            onChange={() => handleRowSelect(row)}
          />
        </td>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
   
  );
};

export default EditableTable;
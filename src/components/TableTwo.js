// src/components/pagination.table.js
import React, { useState, useEffect } from "react";

import { useTable, usePagination, useSortBy } from "react-table";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1, pageSize: 10 },
    },

    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <div>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <ul className="pagination">
        <li
          className="page-item"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <a className="page-link">First</a>
        </li>
        <li
          className="page-item"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <a className="page-link">{"<"}</a>
        </li>
        <li
          className="page-item"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <a className="page-link">{">"}</a>
        </li>
        <li
          className="page-item"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <a className="page-link">Last</a>
        </li>
        <li>
          <a className="page-link">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </a>
        </li>
        <li>
          <a className="page-link">
            <input
              className="form-control"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px", height: "20px" }}
            />
          </a>
        </li>{" "}
        <select
          className="form-control"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          style={{ width: "120px", height: "38px" }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </ul>
    </div>
  );
}

function TableTwo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(
        "https://canopy-frontend-task.vercel.app/api/transactions"
      );
      const resData = await res.json();
      console.log(resData.transactions);
      setData(resData.transactions);
    };
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Ticket Ref",
            accessor: "ticketref",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Trade Date",
            accessor: "traded_on",
          },
          {
            Header: "QTY",
            accessor: "quantity",
          },
          {
            Header: "CCY",
            accessor: "currency",
          },
          {
            Header: "Settlement Amount",
            accessor: "settlement_amount",
          },
        ],
      },
    ],
    []
  );

  console.log(JSON.stringify(data));

  return <Table columns={columns} data={data} />;
}

export default TableTwo;

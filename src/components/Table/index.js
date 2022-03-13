import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRowContext } from "../../hooks/RowProvider";

import Pagination from "./Pagination";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableTopBlock from "./TableTopBlock";

const Table = (props) => {
  const { currentPage } = useRowContext();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    !!currentPage && setSearchParams({ page: currentPage });
  }, [currentPage]);

  return (
    <div className="table-wrapper">
      <TableTopBlock />
      <div className="table-wrapper-inner">
        <table>
          <TableHead {...props} />
          <TableBody {...props} />
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default Table;

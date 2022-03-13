import React from "react";
import { useRowContext } from "../../hooks/RowProvider";

function Pagination() {
  const { currentPage, setCurrentPage } = useRowContext();
  const handlePage = (page) => setCurrentPage(page);

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
        title="Prev"
      >
        {"<"}
      </button>
      <ul>
        {[1, 2, 3, 4, 5].map((el, i) => (
          <li
            key={i}
            onClick={() => handlePage(el)}
            className={currentPage === el ? "active" : ""}
          >
            {el}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === 5}
        title="Next"
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;

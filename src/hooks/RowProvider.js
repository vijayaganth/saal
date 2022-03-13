import React, { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const RowContext = createContext();

function RowProvider({ children }) {
  const [searchParams] = useSearchParams();
  const pageValue = searchParams.get("page");

  const [currentRow, setCurrentRow] = useState(null);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (!pageValue) {
      setCurrentPage(1);
    } else {
      setCurrentPage(Number(pageValue));
    }
  }, []);

  return (
    <RowContext.Provider
      value={{
        currentRow,
        setCurrentRow,
        currentColumn,
        setCurrentColumn,
        currentPage,
        setCurrentPage,
        searchString,
        setSearchString,
      }}
    >
      {children}
    </RowContext.Provider>
  );
}

export const useRowContext = () => {
  const context = useContext(RowContext);
  if (context === undefined) {
    throw new Error("Row error");
  }
  return context;
};

export default RowProvider;

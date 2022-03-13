import React, { useState } from "react";
import { useRowContext } from "../../hooks/RowProvider";

function TableTopBlock() {
  const { setSearchString } = useRowContext();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="table-topBlock">
      <h3>User list</h3>
      <div className="search-block">
        <input
          type="text"
          placeholder="search by username"
          onChange={(e) =>
            setSearchValue(e.target.value.replace(/[^A-Za-z]/gi, ""))
          }
          // search by text only
          value={searchValue}
        />
        <button onClick={() => setSearchString(searchValue)}>Search</button>
      </div>
    </div>
  );
}

export default TableTopBlock;

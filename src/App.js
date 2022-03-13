import React from "react";
import Users from "./Pages/Users";

import "./style/reset.css";
import "./style/common.scss";
import PopupProvider from "./hooks/PopupProvider";
import RowProvider from "./hooks/RowProvider";

function App() {
  return (
    <div>
      <PopupProvider>
        <RowProvider>
          <Users />
        </RowProvider>
      </PopupProvider>
    </div>
  );
}

export default App;

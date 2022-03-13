import React from "react";
import { usePopup } from "../../hooks/PopupProvider";
import { useRowContext } from "../../hooks/RowProvider";

const Popup = ({ open, children, Title, style, classSelect = "" }) => {
  const { setPopupOpen } = usePopup();
  const { setCurrentRow, setCurrentColumn } = useRowContext();
  const handlePopupClose = () => {
    setPopupOpen(false);
    setCurrentRow(null);
    setCurrentColumn(null);
  };

  return (
    <div className={"popup " + (open ? "open" : "")}>
      <div style={style} className={classSelect}>
        <span title="Close" className="close" onClick={handlePopupClose}>
          X
        </span>
        {!!Title && <h3>{Title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Popup;

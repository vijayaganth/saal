import React, { createContext, useContext, useState } from "react";

export const PopupContext = createContext();

function PopupProvider({ children }) {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <PopupContext.Provider value={{ popupOpen, setPopupOpen }}>
      {children}
    </PopupContext.Provider>
  );
}

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error("popup error");
  }
  return context;
};

export default PopupProvider;

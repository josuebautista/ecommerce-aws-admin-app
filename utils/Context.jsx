import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [showNavigation, setShowNavigation] = useState(true);

  const handleNav = () => {
    setShowNavigation(!showNavigation)
  }

  return <AppContext.Provider value={{
    showNavigation, 
    handleNav,
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider};
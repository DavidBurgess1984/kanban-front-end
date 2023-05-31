import React, { useContext, useState } from "react";

const MenuContext = React.createContext(null);

const MenuProvider = ({ children }) => {

  const [visible, toggleMenuVisible] = useState(false)


  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useMenu hook.
  return (
    <MenuContext.Provider
      value={{
        visible,
        toggleMenuVisible
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// The useMenu hook can be used by any descendant of the BoardsProvider. It
// provides the Goals of the BoardsProvider's project and various functions to
// create, update, and delete the Goals in that project.
const useMenu = () => {
  const goals = useContext(MenuContext);
  if (goals == null) {
    throw new Error("useMenu() called outside of a MenuProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return goals;
};

export { MenuProvider, useMenu };

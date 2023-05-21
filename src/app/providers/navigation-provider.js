import React, { useContext, useState } from "react";

const NavigationContext = React.createContext(null);

const NavigationProvider = ({ children }) => {

  const [visible, toggleNavigationVisible] = useState(false)


  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useNavigation hook.
  return (
    <NavigationContext.Provider
      value={{
        visible,
        toggleNavigationVisible
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// The useNavigation hook can be used by any descendant of the BoardsProvider. It
// provides the Goals of the BoardsProvider's project and various functions to
// create, update, and delete the Goals in that project.
const useNavigation = () => {
  const goals = useContext(NavigationContext);
  if (goals == null) {
    throw new Error("useNavigation() called outside of a NavigationProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return goals;
};

export { NavigationProvider, useNavigation };

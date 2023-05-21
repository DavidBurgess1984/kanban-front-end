import React, { useContext, useState } from "react";

const ThemeContext = React.createContext(null);

const ThemeProvider = ({ children }) => {

  const [theme, toggleTheme] = useState("light")


  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTheme hook.
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// The useTheme hook can be used by any descendant of the BoardsProvider. It
// provides the Goals of the BoardsProvider's project and various functions to
// create, update, and delete the Goals in that project.
const useTheme = () => {
  const goals = useContext(ThemeContext);
  if (goals == null) {
    throw new Error("useTheme() called outside of a ThemeProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return goals;
};

export { ThemeProvider, useTheme };

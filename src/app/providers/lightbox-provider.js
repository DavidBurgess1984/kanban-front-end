import React, { useContext, useState } from "react";


const LightboxContext = React.createContext(null);

const LightboxProvider = ({ children }) => {

  const [isVisible,toggleLightboxVisible] = useState(false)
  const [content, setLightboxContent] = useState('add-task')
  const [taskId, setTaskId] = useState(-1)


  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useLightbox hook.
  return (
    <LightboxContext.Provider
      value={{
        isVisible,
        toggleLightboxVisible,
        content,
        setLightboxContent,
        taskId,
        setTaskId,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

// The useLightbox hook can be used by any descendant of the BoardsProvider. It
// provides the Goals of the BoardsProvider's project and various functions to
// create, update, and delete the Goals in that project.
const useLightbox = () => {
  const goals = useContext(LightboxContext);
  if (goals == null) {
    throw new Error("useLightbox() called outside of a LightboxProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return goals;
};

export { LightboxProvider, useLightbox };

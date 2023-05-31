import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useBoards } from "./app/providers/board-provider";
import { useTasks } from "./app/providers/task-provider";

import BoardContainer from "./containers/board/board-container";
import Error from "./components/error/not-found";
import HeaderContainer from "./containers/header/header-container";
import LightboxContainer from "./containers/lightbox/lightbox-container";

import "../src/css/colors.css";
import "../src/css/reset.css";
import "../src/css/structure.css";
import "../src/css/style.css";

function App() {
  const {initialiseBoards} = useBoards();
  const {initialiseTasks} = useTasks();
  
  const boardPageElements = (
    <React.Fragment>
      <LightboxContainer />
      <HeaderContainer />
      <DndProvider backend={HTML5Backend}>
        <BoardContainer />
      </DndProvider>
    </React.Fragment>

  )
  const router = createBrowserRouter([
    {
      path: "/kanban-front-end/:boardId",
      element: boardPageElements
      
    },
    {
      path: "/kanban-front-end",
      element: boardPageElements,
    },
    {
      path:'/error',
      element: <React.Fragment>
      <HeaderContainer />
      <Error/>
    </React.Fragment>,
    }
  ]);

  useEffect(() => {
    initialiseBoards()
    initialiseTasks()
  },[])

  return (
    <div className="container">
        <RouterProvider router={router} />
    </div>
  );

  
}

export default App;

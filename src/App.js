import HeaderContainer from "./containers/header/header-container";
import "../src/css/reset.css"
import "../src/css/structure.css"
import "../src/css/colors.css"
import "../src/css/style.css"
import BoardContainer from "./containers/board/board-container";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialiseTasks } from "./app/features/task/taskSlice";
import { initialiseBoards } from "./app/features/board/boardSlice";
import LightboxContainer from "./containers/lightbox/lightbox-container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseBoards())
    dispatch(initialiseTasks())
  },[dispatch])

  return (
    <div className="container">
      <LightboxContainer />
      <HeaderContainer />
      <DndProvider backend={HTML5Backend}>
        <BoardContainer />
      </DndProvider>
    </div>
  );

  
}

export default App;

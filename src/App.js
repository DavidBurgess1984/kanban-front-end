import HeaderContainer from "./containers/header/header-container";
import "../src/css/reset.css"
import "../src/css/structure.css"
import "../src/css/colors.css"
import "../src/css/style.css"
import BoardContainer from "./containers/board/board-container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LightboxContainer from "./containers/lightbox/lightbox-container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useBoards } from "./app/providers/board-provider";
import { useTasks } from "./app/providers/task-provider";

function App() {
  const {initialiseBoards} = useBoards();
  const {initialiseTasks} = useTasks();

  useEffect(() => {
    initialiseBoards()
    initialiseTasks()
  },[])

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

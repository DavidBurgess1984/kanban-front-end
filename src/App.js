import HeaderContainer from "./containers/header/header-container";
import "../src/css/reset.css"
import "../src/css/structure.css"
import "../src/css/colors.css"
import "../src/css/style.css"
import BoardContainer from "./containers/board/board-container";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialiseTasks } from "./app/features/task/taskSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseTasks())
  },[dispatch])

  return (
    <div class="container">
      <HeaderContainer />
      <BoardContainer />
    </div>
  );

  
}

export default App;

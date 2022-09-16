

import React, { Fragment } from "react";
import logo from "../../assets/logo-mobile.svg"
import BoardSelectionContainer from "../../containers/header/board-selection-container";
import AddBoardContainer from "../../containers/lightbox/content/add-board-container";
import AddTaskContainer from "../../containers/lightbox/content/add-task-container";
import DeleteBoardContainer from "../../containers/lightbox/content/delete-board-container";
import LightboxContainer from "../../containers/lightbox/lightbox-container";

const Header = (props) => {

  let lightbox = null;
  let lightboxContent = null;

  switch(props.lightboxContent){
    case 'add-task':
      lightboxContent = <AddTaskContainer />
      break;
    case 'add-board':
      lightboxContent = <AddBoardContainer />
      break;
    case 'edit-board':
      lightboxContent = <AddBoardContainer activeBoard={props.activeBoard} />
      break;
    case 'delete-board':
      lightboxContent = <DeleteBoardContainer activeBoard={props.activeBoard} closeLightBox={props.toggleAddTaskLightboxVisible} />
      break;
  }
  if(props.addTaskLightBoxVisible){
    lightbox = (
    <LightboxContainer closeLightBox={props.toggleAddTaskLightboxVisible}>
      {lightboxContent}
    </LightboxContainer>
    )
  }

  let boardViewDropdown = null;

    if(props.boardDropdownOpen){
      boardViewDropdown = (
        <div className="board__toggle-dropdown" ref={props.wrapperRef}>
            <ul class='board__toggle-dropdown-list'>
                <li className="board__toggle-dropdown-list-item" onClick={(e) => props.toggleEditBoardLightboxVisible(e)}>Edit Board</li>
                <li className="board__toggle-dropdown-list-item board__toggle-dropdown-list-item--red" onClick={(e) => props.toggleDeleteBoardLightboxVisible(e)}>Delete Board</li>
            </ul>
        </div>
        )
    }

   return (
    <Fragment>
      {lightbox}
      {boardViewDropdown}
      <header className="header">
          <img className="header__item header__item--left navigation__logo" src={ logo} alt='logo-icon'/>
          <div className="header__item header__item--left header__item--flex-grow">
            <a className={ "board-selection  board-selection--active" } href='' onClick={(e) => props.toggleNavigationPanel(e)}>{props.activeBoard.title}</a>
            <BoardSelectionContainer 
              navigationVisible={props.navigationVisible} 
              toggleNavigationPanel={props.toggleNavigationPanel}
              toggleAddBoardLightboxVisible={props.toggleAddBoardLightboxVisible}
            />
          </div>
          <div className="header__item header__item--right">
            <a className="header__button header__button--create header__button--create-disabled" onClick={(e) => props.toggleAddTaskLightboxVisible(e)}>&nbsp;</a>
          </div>
          <div className="header__item header__item--right">
            <a className="header__more-info-button" onClick={(e) => props.setBoardDropdownOpen(!props.boardDropdownOpen)}>&nbsp;</a>
          </div>
        </header>
      </Fragment>
    );
}

export default Header
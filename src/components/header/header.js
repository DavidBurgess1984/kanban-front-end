

import React, { Fragment } from "react";
import BoardSelectionContainer from "../../containers/header/board-selection-container";

const Header = (props) => {

  const logoTheme = props.theme === 'dark' ? 'navigation__logo--dark' : ''
  const headerTheme = props.theme === 'dark' ? 'header--dark' : ''
  const boardTitleTheme = props.theme === 'dark' ? 'board-selection--dark' : ''
  const boardDropdownTheme = props.theme === 'dark' ? 'board__toggle-dropdown-list-item--dark' : ''
  let boardViewDropdown = null;

    if(props.boardDropdownOpen){
      boardViewDropdown = (
        <div className="board__toggle-dropdown" ref={props.wrapperRef}>
            <ul className='board__toggle-dropdown-list'>
                <li className={"board__toggle-dropdown-list-item "+boardDropdownTheme } onClick={(e) => props.showEditBoardLightboxVisible(e)}>Edit Board</li>
                <li className={"board__toggle-dropdown-list-item board__toggle-dropdown-list-item--red " + boardDropdownTheme } onClick={(e) => props.showDeleteBoardLightbox(e)}>Delete Board</li>
            </ul>
        </div>
        )
    }



   return (
    <Fragment>
      {boardViewDropdown}
      <header className={"header "+headerTheme}>
          <a href='/' className={"header__item header__item--left navigation__logo "+logoTheme}  alt='logo-icon'/>
          <div className="header__item header__item--left header__item--flex-grow">
            <a className={ "board-selection  board-selection--active "+boardTitleTheme } href='' onClick={(e) => props.toggleNavigationPanel(e)}>{props.activeBoard.title}</a>
            <BoardSelectionContainer 
              navigationVisible={props.navigationVisible} 
              toggleNavigationPanel={props.toggleNavigationPanel}
              showAddBoardLightbox={props.showAddBoardLightbox}
            />
          </div>
          <div className="header__item header__item--right">
            <a className="header__button header__button--create header__button--create-disabled" onClick={(e) => props.showAddTaskLightbox(e)}><span className='header__button-text'>+ Add New Task</span></a>
          </div>
          <div className="header__item header__item--right">
            <a className="header__more-info-button" onClick={(e) => props.setBoardDropdownOpen(!props.boardDropdownOpen)}>&nbsp;</a>
          </div>
        </header>
      </Fragment>
    );
}

export default Header
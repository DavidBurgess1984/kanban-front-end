

import React, { Fragment } from "react";
import logo from "../../assets/logo-mobile.svg"
import BoardSelectionContainer from "../../containers/header/board-selection-container";
import AddTaskContainer from "../../containers/lightbox/content/add-task-container";
import LightboxContainer from "../../containers/lightbox/lightbox-container";

const Header = (props) => {

  let lightbox = null;
  
  if(props.addTaskLightBoxVisible){
    lightbox = (
    <LightboxContainer closeLightBox={props.toggleAddTaskLightboxVisible}>
      <AddTaskContainer/>
    </LightboxContainer>
    )
  }

   return (
    <Fragment>
      {lightbox}
      <header className="header">
          <img className="header__item header__item--left navigation__logo" src={ logo} alt='logo-icon'/>
          <div className="header__item header__item--left header__item--flex-grow">
            <a className={ "board-selection  board-selection--active" } href='' onClick={(e) => props.toggleNavigationPanel(e)}>Platform Launch</a>
            <BoardSelectionContainer 
              navigationVisible={props.navigationVisible} 
              toggleNavigationPanel={props.toggleNavigationPanel}
            />
          </div>
          <div className="header__item header__item--right">
            <a className="header__button header__button--create header__button--create-disabled" onClick={(e) => props.toggleAddTaskLightboxVisible(e)}>&nbsp;</a>
          </div>
          <div className="header__item header__item--right">
            <a className="header__more-info-button" >&nbsp;</a>
          </div>
        </header>
      </Fragment>
    );
}

export default Header
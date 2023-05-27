import React from "react"
// import { useSelector } from "react-redux";
import ItemEdit from "./item-edit"

const ItemList = ({items,addItem,editItemHandler,deleteItemHandler,errors,title,addItemBtnTxt,type}) => {

    let itemList = [];

    items.map((item,i) => {

        let placeholderText = ""
        
        if(i == 0){
            if(typeof type !== "undefined" && type == 'columns'){
                placeholderText = "e.g. In Backlog";
            } else {
                placeholderText = "e.g. Drink coffee & smile";
            }
            
        } else if (i == 1){
            if(typeof type !== "undefined"  && type == 'columns'){
                placeholderText = "e.g. Assigned";
            } else {
                placeholderText =  "e.g. Make coffee" 
            }
        }

        itemList.push(<ItemEdit key={"item-"+i} placeholder={placeholderText} value={item.name} index={i} editItemHandler={editItemHandler} deleteItemHandler={deleteItemHandler} errors={errors}/>)
    });

    // const theme = useSelector(state => state.theme)
    const titleTheme = /*theme.value === 'dark' ? 'task__label--dark':*/ '';
    const btnTheme = /*theme.value === 'dark' ? 'form__button--dark':*/ '';
    return (
        <div className="task__input">
            <h3 className={"list__title "+titleTheme}>{title}</h3>
            <ul className="items">
                {itemList}
                <li className="list__item--edit">
                    <a className={"form__button form__button--secondary " +btnTheme} onClick={addItem}>+ {addItemBtnTxt}</a>
                </li>
            </ul>
        </div>
    )
}

export default ItemList
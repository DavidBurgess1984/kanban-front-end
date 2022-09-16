import React from "react"
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

    return (
        <div className="task__input">
            <h3 className="list__title">{title}</h3>
            <ul className="items">
                {itemList}
                <li className="list__item--edit">
                    <a className="form__button form__button--secondary" onClick={addItem}>+ {addItemBtnTxt}</a>
                </li>
            </ul>
        </div>
    )
}

export default ItemList
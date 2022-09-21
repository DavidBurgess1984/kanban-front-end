import React, { Fragment } from "react"
import { useSelector } from "react-redux";
import { createSubTask } from "../../app/features/task/taskSlice";

import ItemView from "./item-view";

const ItemListView = ({items,toggleItemStatus}) => {

    let itemList = [];
    let itemCompletedCount = 0;

    const theme = useSelector(state => state.theme)

    items.map((item,i) => {
        if(item.complete){
            itemCompletedCount++
        }
        itemList.push(<ItemView key={"item-view-"+i} checked={item.complete} name={item.name} index={i} toggleItemStatus={toggleItemStatus} id={item.id}/>)
    });

    const listTitleTheme = theme.value === 'dark' ? "list__title--dark" : ""

    return (
        <Fragment>
            <h3 className={"list__title "+listTitleTheme }>{"Subtasks ("+itemCompletedCount+" of "+items.length+")"}</h3>
            <ul className="items">
                {itemList}
            </ul>
        </Fragment>
    )
}

export default ItemListView
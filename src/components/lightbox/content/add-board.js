import React, { Fragment } from "react"
import Select from "../../common/select"
import Subtask from "../../common/subtask"
import TextArea from "../../common/text-area"
import TextInput from "../../common/text-input"

const AddBoard = (props) => {

    return (
        <Fragment>
            <div className="lightbox__header">
                <h2 className="lightbox__title">{props.title}</h2>
            </div>
            <div className="lightbox__content">
                <TextInput title="Board Name" value={props.boardTitle} handleTextChange={(e) => props.setBoardTitle(e.target.value)} placeholder="eg Web Design" errors={props.errors}/>
                <Subtask type='columns' title='Column Names' addSubtaskBtnTxt='Add New Column' addSubtask={props.addSubtask} subTasks={props.subTasks} editSubtaskHandler={props.editSubtask} deleteSubtaskHandler={props.deleteSubtask} errors={props.errors}/>
                <div>
                    <a className="form__button form__button--primary" onClick={(e) => props.taskHandler(e)}>{props.saveBoardButtonText}</a>
                </div>
            </div>
        </Fragment>
    )
}

export default AddBoard
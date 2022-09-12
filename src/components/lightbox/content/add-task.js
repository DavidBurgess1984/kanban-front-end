import React, { Fragment } from "react"
import Select from "../../common/select"
import Subtask from "../../common/subtask"
import TextArea from "../../common/text-area"
import TextInput from "../../common/text-input"

const AddTask = (props) => {
    console.log(props)
    return (
        <Fragment>
            <div class="lightbox__header">
                <h2 class="lightbox__title">{props.title}</h2>
            </div>
            <div class="lightbox__content">
                <TextInput title="Title" value={props.taskTitle} handleTextChange={(e) => props.setTaskTitle(e.target.value)} placeholder="eg Take coffee break" />
                <TextArea title="Description" value={props.taskDescription} handleTextChange={(e) => props.setTaskDescription(e.target.value)} placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." />
                <Subtask addSubtask={props.addSubtask} subTasks={props.subTasks} editSubtaskHandler={props.editSubtask} deleteSubtaskHandler={props.deleteSubtask}/>
                <Select title="Status" options={props.statusOptions} selected={props.status} handleChange={props.setStatus} />
                <div>
                    <a class="form__button form__button--primary" onClick={(e) => props.taskHandler(e)}>{props.saveTaskButtonText}</a>
                </div>
            </div>
        </Fragment>
    )
}

export default AddTask
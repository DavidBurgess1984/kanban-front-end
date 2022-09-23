import { createSlice } from '@reduxjs/toolkit'
import { defaultTaskData } from '../../data/tasks/data'
import { taskStorage } from '../../storage/localStorage'
import { setTaskId, toggleLightboxVisible } from '../lightbox/lightboxSlice'

const validateTaskInput = (task) => {
    let errors = {}
    let errorsFound = false
    if(task.name.length === 0){
        errors.title = "Can't be empty"
        errorsFound = true
    }

    if(task.column_id === -1){
        errors.status = "Must be selected"
        errorsFound = true
    }

    let subtaskErrors = []
    task.subtasks.forEach( (_,i) => {
                

        if(task.subtasks[i].name.length === 0){
            subtaskErrors[i] = {}
            subtaskErrors[i] = "Can't be empty"
            
            errorsFound = true
        }
        
    })

    if(subtaskErrors.length > 0){
        errors.items = subtaskErrors
    }

    return {errorsFound,errors}
}

export const taskSlice = createSlice({
    name:'tasks',
    initialState:{
        tasks:[],
        errors:{}
    },
    reducers:{
        createTask: (state,action) => {

            let data = {...action.payload}
           
            data.id = makeid(10)

            data.subtasks.forEach( (_,i) => {
                data.subtasks[i].id = makeid(20);
            })

            state.tasks.push(data)
 
        },
        clearTaskError(state,action){
            if(typeof action.payload.index !== 'undefined'  && action.payload.error_type === 'items'){
                
                if(typeof state.errors.items !== 'undefined'){
                  
                    delete state.errors.items[action.payload.index]
                }
                
            } else {
                delete state.errors[action.payload.error_type]
            }
            
        },
        setErrors:(state,action)=>{
            state.errors = action.payload.errors
        },
        clearAllTaskErrors: (state) =>{
            state.errors = {}
        },
        editTask:(state,action) => {

            let taskToUpdate = {}
            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.id){
                    state.tasks[i] = action.payload
                    // taskToUpdate = {...state.tasks[i]}
                }
            })

            
        },
        editTaskColumn:(state,action) => {

            let taskToUpdate = {}

            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.task_id){
                    state.tasks[i].column_id = action.payload.column_id
                    taskToUpdate = {...state.tasks[i]}
                }
            })

            taskStorage.update(action.payload.task_id,taskToUpdate) 
        },
        deleteTask: (state, action) =>{
            let indexToDelete;

            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.id){
                    indexToDelete = i; 
                }
            })

            if(typeof indexToDelete !== 'undefined'){
                state.tasks.splice(indexToDelete,1);
            }

            // taskStorage.delete(action.payload.id)
            
        },
        createSubTask: (state,action) => {
            let id = makeid(10);
            let payload = action.payload.subtask
            payload.id = id;
            state.tasks[action.payload.task_id].subtasks.push(payload);
        },
        editSubtask:(state,action) => {
            
            let taskToUpdate = {};
            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.task_id){
                    state.tasks[i].subtasks.forEach((subtask,j) => {
                        if(subtask.id === action.payload.subtask_id){
                            state.tasks[i].subtasks[j] = action.payload.subtask
                            taskToUpdate = {...state.tasks[i]}
                        }
                    })
                }
            })

            taskStorage.update(action.payload.task_id,taskToUpdate) 

        },
        deleteSubtask:(state,action) => {
            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.task_id){
                    state.tasks[i].subtasks.forEach((subtask,j) => {
                        if(subtask.id === action.payload.subtask_id){
                            delete state.tasks[i].subtasks[j]
                        }
                    })
                }
            })
        },
        initialiseTasks:(state, _)=>{
            // taskStorage.clear()
            let tasksInStorage = taskStorage.getAll()
            let tasks = []
            
            if(!tasksInStorage){
                taskStorage.init(defaultTaskData);
                tasks = defaultTaskData;
            } else {
                tasks = tasksInStorage
            }
            
            state.tasks = tasks
        }
    }
})

export const createTaskAction = (task) => async (dispatch) => {
    
    const {errorsFound, errors} = validateTaskInput(task)
    
    if(!errorsFound){
        taskStorage.create(task)
        dispatch(createTask(task))
        dispatch(toggleLightboxVisible({isVisible:false}))
    } else {
        dispatch(setErrors({errors}))
    }
}

export const editTaskAction = (task) => async (dispatch) => {
    
    const {errorsFound, errors} = validateTaskInput(task)
    
    if(!errorsFound){
        taskStorage.update(task.id,task) 
        dispatch(editTask(task))
        dispatch(setTaskId({id:-1}))
        dispatch(toggleLightboxVisible({isVisible:false}))
    } else {
        dispatch(setErrors({errors}))
    }
}

export const deleteTaskAction = (id) => async (dispatch) => {
    
    taskStorage.delete(id)
    dispatch(deleteTask({id}));
    dispatch(toggleLightboxVisible({isVisible:false}))

}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

export const {
    createTask, 
    editTask, 
    deleteTask,
    createSubTask,
    editSubtask,
    deleteSubtask,
    initialiseTasks,
    editTaskColumn,
    clearTaskError,
    clearAllTaskErrors,
    setErrors
} = taskSlice.actions

export default taskSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { defaultTaskData } from '../../data/tasks/data'
import { taskStorage } from '../../storage/localStorage'

export const taskSlice = createSlice({
    name:'tasks',
    initialState:{
        tasks:[],
        errors:{}
    },
    reducers:{
        createTask: (state,action) => {

            state.errors = {}

            let data = {...action.payload}
            let errorsFound = false

            if(data.name.length === 0){
                state.errors.title = "Can't be empty"
                errorsFound = true
            }
            if(data.description.length === 0){
                state.errors.description = "Can't be empty"
                errorsFound = true
            }

            data.id = makeid(10)

            let subtaskErrors = {}
            data.subtasks.forEach( (_,i) => {
                

                if(data.subtasks[i].name.length === 0){
                    subtaskErrors[i] = {}
                    subtaskErrors[i] = "Can't be empty"
                    
                    errorsFound = true
                }
                data.subtasks[i].id = makeid(20);
                
            })

            if(errorsFound){
                state.errors.subtasks = subtaskErrors
            }


            if(!errorsFound){
                taskStorage.create(data)
                state.tasks.push(data)
            }
            
            
        },
        clearTaskError(state,action){
            if(typeof action.payload.index !== 'undefined'){
                if(typeof state.errors.subtasks !== 'undefined'){
                    delete state.errors.subtasks[action.payload.index]
                }
                
            } else {
                delete state.errors[action.payload.error_type]
            }
            
        },
        editTask:(state,action) => {

            let taskToUpdate = {}
            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.id){
                    state.tasks[i] = action.payload
                    taskToUpdate = {...state.tasks[i]}
                }
            })

            taskStorage.update(action.payload.id,taskToUpdate) 
        },
        editTaskColumn:(state,action) => {

            let taskToUpdate = {}

            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.task_id){
                    state.tasks[i].column_id = parseInt(action.payload.column_id)
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

            taskStorage.delete(action.payload.id)
            
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
    clearTaskError
} = taskSlice.actions

export default taskSlice.reducer
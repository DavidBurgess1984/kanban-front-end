import { createSlice } from '@reduxjs/toolkit'
import { defaultTaskData } from '../../data/tasks/data'
import { taskStorage } from '../../storage/localStorage'

export const taskSlice = createSlice({
    name:'tasks',
    initialState:{
        tasks:[]
    },
    reducers:{
        createTask: (state,action) => {

            let data = {...action.payload}
            data.id = makeid(10)
            data.subtasks.forEach( (_,i) => {
                data.subtasks[i].id = makeid(20);
            })

            taskStorage.create(data)
            state.tasks.push(data)
            
        },
        editTaskName:(state,action) => {

            let taskToUpdate = {}
            state.tasks.forEach((task,i) => {
                if(task.id === action.payload.task_id){
                    state.tasks[i].name = action.payload.name
                    taskToUpdate = {...state.tasks[i]}
                }
            })

            taskStorage.update(action.payload.task_id,taskToUpdate) 
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
                if(task.id === action.payload.task_id){
                    indexToDelete = i; 
                }
            })

            if(typeof indexToDelete !== 'undefined'){
                state.tasks.splice(indexToDelete,1);
            }
            
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
    editTaskName, 
    deleteTask,
    createSubTask,
    editSubtask,
    deleteSubtask,
    initialiseTasks,
    editTaskColumn
} = taskSlice.actions

export default taskSlice.reducer
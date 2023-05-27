import React, { useContext, useState } from "react";
import { taskStorage } from "../storage/localStorage";
import { defaultTaskData } from "../data/tasks/data";
import { useLightbox } from "./lightbox-provider";


const TaskContext = React.createContext(null);

const TaskProvider = ({ children }) => {

    const{ toggleLightboxVisible, setTaskId } = useLightbox() 
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

    const [tasks,setTasks ] = useState([]);
    const [errors,setErrors] = useState({})

    const createTask = (payload) => {
        let data = {...payload}
            
        data.id = makeid(20)

        data.subtasks.forEach( (_,i) => {
            data.subtasks[i].id = makeid(20);
        })

        // console.log(data)

        let newTasks = [];
        // console.log(tasks)

        tasks.forEach(item => newTasks.push(item))
        newTasks.push(data)
        // console.log(newTasks)
        setTasks(newTasks)

        return data;
    }

    const clearTaskError = (payload) =>{

        let newErrors = {...errors}
        if(typeof payload.index !== 'undefined'  && payload.error_type === 'items'){
            
            if(typeof newErrors.items !== 'undefined'){
            
                delete newErrors.items[payload.index]
            }
            
        } else {
            delete newErrors[payload.error_type]
        }

        setErrors(newErrors)
        
    }


    const clearAllTaskErrors = () =>{
        setErrors({})
    }


    const  editTask = (payload) => {

        // console.log(payload);
        let newTasks = []
            tasks.forEach((task,i) => {

                let newTask = {}
                if(task.id === payload.id){
                    newTask = payload
                } else {
                    newTask = {...task}
                }
                newTasks.push(newTask);
            })

            setTasks(newTasks)
        }

        const  editTasks = (payloadArray) => {

            // console.log(payloadArray);
            let newTasks = []
                tasks.forEach((task,i) => {
                    let newTask = task
                    for(var i =0 ; i< payloadArray.length;i++){
                        let payload = payloadArray[i];
                        if(task.id === payload.id){
                            newTask = payload
                        } 
                    
                    }

                    newTasks.push(newTask);
                    
                })
    
                setTasks(newTasks)
            }
    const editTaskColumn =(payload) => {

        let taskToUpdate = {}
        let newTasks = []
        tasks.forEach((task,i) => {
            if(task.id === payload.task_id){
                tasks[i].column_id = payload.column_id
                taskToUpdate = {...tasks[i]}
            }
            newTasks.push(task)
        })

        setTasks(newTasks)

        taskStorage.update(payload.task_id,taskToUpdate) 
    }
    const deleteTask = (id) =>{
        // let indexToDelete;

        let newTasks = []
        tasks.forEach((task,i) => {
            if(task.id !== id){
                newTasks.push(task)
            }
        })

       setTasks(newTasks)

        // taskStorage.delete(action.payload.id)
        
    }
    const createSubTask = (state,action) => {
        let id = makeid(20);
        let payload = action.payload.subtask
        payload.id = id;
        state.tasks[action.payload.task_id].subtasks.push(payload);
    }

    const editSubtask =(payload) => {

        // console.log(payload)
        
        let taskToUpdate = {};
        let newTasks = []
        tasks.forEach((task,i) => {
            if(task.id === payload.task_id){
                tasks[i].subtasks.forEach((subtask,j) => {
                    if(subtask.id === payload.subtask_id){
                        task.subtasks[j] = payload.subtask
                        taskToUpdate = {...tasks[i]}
                    }
                })
            }
            newTasks.push(task)
        })

        setTasks(newTasks)
        taskStorage.update(payload.task_id,taskToUpdate) 

    }

    const deleteSubtask = (state,action) => {
        state.tasks.forEach((task,i) => {
            if(task.id === action.payload.task_id){
                state.tasks[i].subtasks.forEach((subtask,j) => {
                    if(subtask.id === action.payload.subtask_id){
                        delete state.tasks[i].subtasks[j]
                    }
                })
            }
        })
    }

    const initialiseTasks = () =>{
        // taskStorage.clear()
        let tasksInStorage = taskStorage.getAll()
        let tasks = []
        
        if(!tasksInStorage){
            taskStorage.init(defaultTaskData);
            tasks = defaultTaskData;
        } else {
            tasks = tasksInStorage
        }
        // console.log(tasks)
        setTasks(tasks)
    }
    //     }
    // })

    const createTaskAction = (task) => {
        
        const {errorsFound, errors} = validateTaskInput(task)
        
        if(!errorsFound){
            const taskToStore = createTask(task)
            taskStorage.create(taskToStore)
            
            toggleLightboxVisible(false)
        } else {
            setErrors(errors)
        }
    }

    const editTaskAction = (task) => {
        
        const {errorsFound, errors} = validateTaskInput(task)
        if(!errorsFound){
            taskStorage.update(task.id,task) 
            editTask(task)
            setTaskId(-1)
            toggleLightboxVisible(false)
        } else {
            setErrors(errors)
        }
    }

    const storeLocalTaskStateToStorage = () => {
        console.log(tasks)
        taskStorage.updateAllTasks(tasks)
    }

    const deleteTaskAction = (id) => {
        
        taskStorage.delete(id)
       deleteTask(id);
        toggleLightboxVisible(false)

    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
        return result + Date.now();
    }

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TaskContext.Provider
      value={{
        createTask,
        createSubTask,
        clearTaskError,
        clearAllTaskErrors,
        editTask,
        editTaskColumn,
        deleteTask,
        editSubtask,
        deleteSubtask,
        initialiseTasks,
        editTaskAction,
        deleteTaskAction,
        createTaskAction,
        setTasks,
        editTasks,
        storeLocalTaskStateToStorage,
        tasks,
        errors

      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TaskProvider. It
// provides the Goals of the TaskProvider's project and various functions to
// create, update, and delete the Goals in that project.
const useTasks = () => {
  const tasks = useContext(TaskContext);
  if (tasks == null) {
    throw new Error("useTasks() called outside of a TaskProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return tasks;
};

export { TaskProvider, useTasks };


export const taskStorage = {
    getAll:() => {
        return JSON.parse(window.localStorage.getItem('tasks'));
    },
    create:(value) => {
        let tasks = taskStorage.getAll();
        tasks.push(value)
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    update:(taskId,value) => {
        let tasks = taskStorage.getAll();
        tasks.forEach((task,i) => {
            if(task.id === taskId){
                tasks[i] = value
            }
        });

        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    init:(data) => {
        window.localStorage.setItem('tasks',JSON.stringify(data));
    },
    clear:() => {
        window.localStorage.removeItem('tasks');
    }
}
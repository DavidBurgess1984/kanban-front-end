
export const taskStorage = {
    getAll:() => {
        return JSON.parse(window.localStorage.getItem('tasks'));
    },
    updateAllTasks:(tasks) => {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
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
    delete:(taskId) => {
        let tasks = taskStorage.getAll();
        tasks.forEach((task,i) => {
            if(task.id === taskId){
                tasks.splice(i,1);
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

export const boardStorage = {
    getAll:() => {
        return JSON.parse(window.localStorage.getItem('boards'));
    },
    create:(value) => {
        let boards = boardStorage.getAll();
        boards.push(value)
        window.localStorage.setItem('boards', JSON.stringify(boards));
    },
    update:(boardId,value) => {
        let boards = boardStorage.getAll();
        boards.forEach((board,i) => {
            if(board.id === boardId){
                boards[i] = value
            }
        });

        window.localStorage.setItem('boards', JSON.stringify(boards));
    },
    delete:(boardId) => {
        let boards = boardStorage.getAll();
        boards.forEach((board,i) => {
            if(board.id === boardId){
                boards.splice(i,1);
            }
        });

        window.localStorage.setItem('boards', JSON.stringify(boards));
    },
    init:(data) => {
        window.localStorage.setItem('boards',JSON.stringify(data));
    },
    clear:() => {
        window.localStorage.removeItem('boards');
    }
}

export const activeBoardStorage = {
    get:() => {
        return window.localStorage.getItem('activeBoard');
    },
    set:(value) => {
        window.localStorage.setItem('activeBoard',value);
    }
}
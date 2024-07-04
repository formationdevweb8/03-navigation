import ITask from "../interfaces/ITask";

const urlServer: string = process.env.REACT_APP_URL_BACKEND as string;
/* Récupérer toutes les tâches */
export const fetchTasks = async () => {
    const response = await fetch(urlServer + '/tasks', {
        method: 'GET',
    });
    const jsonData = await response.json();
    return jsonData;
};

/* Ajouter une tâche */
export const addTask = async (task: ITask) => {
    const response = await fetch(urlServer + '/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...task })
    });

    const newTask = await response.json();
    return newTask;
};

/* Modifier une tâche */
export const editTask = async (task: ITask) => {
    const response = await fetch(urlServer + '/tasks/' + task._id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...task })
    });

    const updatedTask = await response.json();
    return updatedTask;
}

/* Supprimer une tâche */
export const deleteTask = async (id: string) => {
    const response = await fetch(urlServer + '/tasks/' + id, {
        method: 'DELETE'
    });
    const messageFromServer = await response.json();

    return messageFromServer;
};

/* Rechercher une tâche par id */
export const getTaskById = async (id: string) => {
    const response = await fetch(urlServer + '/gettask/' + id, {
        method: 'GET'
    });
    const jsonTask = await response.json();

    return jsonTask;
};

/* Modifier la valuer done de la tâche par rapport à l'id */
export const updateTaskDone = async (task: ITask) => {
    const response = await fetch(urlServer + '/updatetaskdone/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...task })
    });

    const updatedTask = await response.json();
    return updatedTask;
};
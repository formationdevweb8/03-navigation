// src/views/Tasks.tsx
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskFormObject';
import { fetchTasks, addTask, deleteTask, updateTaskDone } from '../services/fetchTasks';
import ITask from '../interfaces/ITask';
import TaskRow from '../components/TaskRow';
import { version } from 'os';

const Tasks: React.FC = () => {
    const [listTasks, setListTasks] = useState<ITask[]>([]);

    const [isCreation, setIsCreation] = useState(true);
    const [taskToPass, setTaskToPass] = useState();

    const [modalDeleteStyle, setModalDeleteStyle] = useState('modalDeleteHidden');
    const [idTaskToDelete, setIdTaskToDelete] = useState('');

    //modalDeleteVisible

    /*useEffect(() => {
        fetch('http://localhost:5001/tasks')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setListTasks(data);
            });
    }, []);*/

    useEffect(() => {
        getAllTasks()
    }, []);

    const getAllTasks = async () => {
        let list = await fetchTasks();
        setListTasks(list);
    };


    const addTaskInComponentTasks = async (taskToAdd: ITask) => {
        //ajouter une tâche
        let task = await addTask(taskToAdd);
        console.log(task);
        //afficher la liste 
        await getAllTasks();
    };

    //montre le modal de suppression
    const deleteTaskInComponentTasks = (idRowTask: string) => {
        //ouvrir modal de validation
        setModalDeleteStyle('modalDeleteVisible');
        setIdTaskToDelete(idRowTask);
    };
    //cache le modal de suppresion
    const hideModalDelete = () => {
        setModalDeleteStyle('modalDeleteHidden');
        setIdTaskToDelete('');
    }

    //supprimer la lignet 
    //affiche la liste maj
    //cache le modal
    const validateDeleteTaskInDb = async () => {

        //ajouter une tâche
        let task = await deleteTask(idTaskToDelete);
        console.log(task);
        //afficher la liste 
        await getAllTasks();

        hideModalDelete();
    }

    //mise à jour de la valeur done de la tâche 
    const updateTaskCheckbox = async (taskRow: ITask) => {
        let taskResult = await updateTaskDone(taskRow);
        console.log(taskResult);
        //afficher la liste 
        await getAllTasks();
    }


    //TaskRow passer un obkket Task complet 
    //<div key={task._id}>{task.title}+{task._id}</div>
    return (
        <div className="">
            <div><TaskForm task={taskToPass} isCreation={isCreation}
                addTaskInComponentTasks={(taskToAdd: ITask) => addTaskInComponentTasks(taskToAdd)} /></div>
            <div id="supprimerflorian" className={modalDeleteStyle}>
                <div id="popup">
                    <div id="title">Etes-vous sûr de vouloir supprimer la tâche ?</div>
                    <button id="buttonannuler" onClick={() => hideModalDelete()}>
                        <div id="text">
                            <div id="clear">Annuler</div>
                        </div>
                    </button>
                    <button id="buttonsvalider" onClick={() => validateDeleteTaskInDb()}>
                        <div id="text2">
                            <div id="go">Valider</div>
                        </div>
                    </button>
                </div>
            </div>
            <p className="titleTaskList">Liste des tâches</p><div className="centerTable">

                <table>

                    <thead>
                        <tr>
                            <th scope="col">Done</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Modifier</th>
                            <th scope="col">Supprimer</th>
                        </tr>
                    </thead>
                    {listTasks.map((taskRow: ITask) => {
                        return <TaskRow taskRow={taskRow}
                            deleteTaskInComponentTasks={(id: string) => deleteTaskInComponentTasks(id)}
                            updateTaskCheckbox={(taskRow: ITask) => updateTaskCheckbox(taskRow)}
                            key={taskRow._id} />
                    })}
                </table></div>


        </div >
    );
}

export default Tasks;

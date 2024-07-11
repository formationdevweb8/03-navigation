// src/views/Tasks.tsx
import React, { useState } from 'react';
import ITask from '../interfaces/ITask';
type Props = {
    taskRow: ITask;
    deleteTaskInComponentTasks: (id: string) => void;
    updateTaskCheckbox: (taskRow: ITask) => void;
    setTaskrow: React.Dispatch<React.SetStateAction<string>>;
    updateTaskRow: (isModified: boolean, taskRow: ITask) => void;
}
const TaskRow: React.FC<any> = (props: Props) => {
    //récupérer le props.taskRow pour ensuite pouvoir modifier le checkebox
    const [taskRow, setTaskRow] = useState(props.taskRow);

    const updateTaskCheckbox = async (doneValue: boolean) => {
        const taskRowForDone = { ...taskRow, done: doneValue }
        setTaskRow(taskRowForDone);
        console.log("change done value of task");
        //taskRow.done = doneValue;
        props.updateTaskCheckbox(taskRowForDone);
    }


    const deleteTaskInComponent = (value: string) => {
        props.deleteTaskInComponentTasks(taskRow._id!)
    }

    const updateTaskRow = async (value: string) => {
        //arguments
        //isModified:boolean 
        //task:Itask
        props.updateTaskRow(true, taskRow);
    }

    return (
        <tr>
            <td>
                <input type="checkbox" id="done" checked={taskRow.done}
                    onChange={(event) => updateTaskCheckbox(event.target.checked)}
                    name="done"></input>
            </td>
            <td>
                {taskRow.title}
            </td>
            <td>
                {taskRow.description}
            </td>
            <td>{taskRow.date}</td>
            <td>{taskRow.priority}</td>
            <td><button className="otherButtonValidate" onClick={() => updateTaskRow('updateRow')}>Modifier</button></td>
            <td><button className="otherButtonValidate"
                onClick={() => deleteTaskInComponent('delete')}>Supprimer</button></td>
        </tr>
    );
}

export default TaskRow;

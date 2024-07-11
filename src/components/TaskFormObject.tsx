// src/views/Tasks.tsx
import React, { useState, useEffect } from 'react';
import ITask from '../interfaces/ITask';

type Props = {
    addTaskInComponentTasks: (taskRow: ITask, isModified: boolean) => void;
    isModified: boolean;
    task: ITask
}
const TaskFormObject: React.FC<Props> = ({ addTaskInComponentTasks, isModified, task }) => {
    //gestion des erreurs
    const [titleVisible, setTitleVisible] = useState('titleErrorHidden');
    const [dateVisible, setDateVisible] = useState('dateErrorHidden');

    const [taskForm, setTaskForm] = useState<ITask>({ date: '', title: '', priority: 'oui' });

    const [showButtonCreateOrModify, setShowButtonCreateOrModify] = useState('');
    //enum pour les type des champs
    enum FormFields {
        StringField,
        TextAreaField,
        DateField,
        CheckBoxField,
        RadioButtonField
    }

    useEffect(() => {
        //state pour les champs
        if (!isModified) {
            setTaskForm({ title: '', description: '', date: '', done: false, priority: 'oui' });
            setShowButtonCreateOrModify("Créer")
        } else {
            setTaskForm(task);
            setShowButtonCreateOrModify("Modifier")
        }
    }, [isModified]);

    useEffect(() => {
        //state pour les champs
        if (isModified) {
            setTaskForm(task);
            //setShowButtonCreateOrModify("Modifier")
        }
    }, [task._id]);

    function handleChange<T>(value: T, typeField: number): void {
        if (typeField === FormFields.StringField) {
            //setTitle(value as string);
            setTaskForm({ ...taskForm, title: value as string });
        }
        if (typeField === FormFields.TextAreaField) {
            setTaskForm({ ...taskForm, description: value as string });
        }
        if (typeField === FormFields.DateField) {
            setTaskForm({ ...taskForm, date: value as string });
        }
        if (typeField === FormFields.CheckBoxField) {
            setTaskForm({ ...taskForm, done: value as boolean });
        }
        if (typeField === FormFields.RadioButtonField) {
            setTaskForm({ ...taskForm, priority: value as string });
        }
    }



    function modifyTask(event: any) {
        event.preventDefault();
        setTitleVisible('titleErrorHidden');
        setDateVisible('dateErrorHidden');

        let fieldsValidated = true;
        //vérifier que le title n'est pas vide
        if (taskForm.title === '') {
            //si erreur l'intitulé montrer l'erreur
            setTitleVisible('titleErrorVisible');
            fieldsValidated = false;
        }

        if (taskForm.date === '') {
            //si erreur date montrer l'erreur
            setDateVisible('dateErrorVisible');
            fieldsValidated = false;
        }
        if (fieldsValidated) {
            addTaskInComponentTasks(taskForm, isModified);
        }


        //TODO
        //renvoyer l'objet tâche au parent pour modifier les données 
        //ensuite rappeler dans le parent la liste et l'afficher avec els donénes créé ou modifié 
        return fieldsValidated;

    }

    //au dessous c'est les traitements
    //en dessous c'est render
    return (
        <div className="">
            <form onSubmit={modifyTask}>
                <div>
                    <input onChange={(event) => handleChange(event.target.value, FormFields.StringField)}
                        type="text" value={taskForm.title} className="inputFormField" placeholder="Intitulé *"></input>
                    <div className={titleVisible}>
                        Veuillez saisir le champ 'intitulé'
                    </div>
                </div>
                <div>
                    <textarea value={taskForm.description} onChange={(event) => handleChange(event.target.value, FormFields.TextAreaField)}
                        placeholder="Description" rows={10} className="inputFormField"></textarea>
                </div>
                <div>
                    <input type="date" value={taskForm.date} onChange={(event) => handleChange(event.target.value, FormFields.DateField)} className="inputFormField" placeholder="Date jj/mm/aaaa *"></input>
                    <div className={dateVisible}>
                        Veuillez saisir le champ 'date'
                    </div>
                </div>
                <div><h2>Priorité</h2></div>
                <div className="priorityRow">
                    <div>
                        <input type="radio" id="oui" name="priority" value="oui" checked={taskForm.priority === "oui"}
                            onClick={(event) => handleChange((event.target as HTMLInputElement).value, FormFields.RadioButtonField)} />
                        <label htmlFor="huey">Oui</label>
                    </div>

                    <div>
                        <input type="radio" id="non" name="priority" value="non" checked={taskForm.priority === "non"}
                            onClick={(event) => handleChange((event.target as HTMLInputElement).value, FormFields.RadioButtonField)} />
                        <label htmlFor="priority">Non</label>
                    </div>
                    <div>
                        <input type="radio" id="peutetre" name="priority" value="peutetre" checked={taskForm.priority === "peutetre"}
                            onClick={(event) => handleChange((event.target as HTMLInputElement).value, FormFields.RadioButtonField)} />
                        <label htmlFor="priority">Peut être</label>
                    </div>



                </div>
                <div>
                    <input type="checkbox" id="done" checked={taskForm.done} onChange={(event) => handleChange(event.target.checked, FormFields.CheckBoxField)}
                        name="done"></input>
                    <label htmlFor="done">Done</label>
                </div>
                <div>
                    <input className="buttonValidate" type="submit" value={showButtonCreateOrModify} />
                </div>




            </form >

        </div >
    );
}

export default TaskFormObject;

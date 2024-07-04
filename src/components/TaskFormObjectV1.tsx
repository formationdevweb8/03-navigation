// src/views/Tasks.tsx
import React, { useState, useEffect } from 'react';
import ITask from '../interfaces/ITask';
type Props = {
    task: ITask;
    isCreation: boolean
}

const TaskFormObject: React.FC<any> = ({ task, isCreation }) => {
    //gestion des erreurs
    const [titleVisible, setTitleVisible] = useState('titleErrorHidden');
    const [dateVisible, setDateVisible] = useState('dateErrorHidden');

    const [showButtonCreateOrModify, setShowButtonCreateOrModify] = useState('');

    useEffect(() => {
        //state pour les champs
        if (isCreation) {
            task.title = '';
            task.description = '';
            task.date = '';
            task.done = false;
            setShowButtonCreateOrModify("Créer")
        } else {
            setShowButtonCreateOrModify("Modifier")
        }
    }, []);

    const [taskForm, setTask] = useState(task);

    //enum pour les type des champs
    enum FormFields {
        StringField,
        TextAreaField,
        DateField,
        CheckBoxField,
    }

    //modifier les champs and l'objet taskForm
    function handleChange<T>(value: T, typeField: number): void {
        if (typeField === FormFields.StringField) {
            setTask({ ...taskForm, title: value as string });
        }
        if (typeField === FormFields.TextAreaField) {
            setTask({ ...taskForm, description: value as string });
        }
        if (typeField === FormFields.DateField) {
            setTask({ ...taskForm, date: value as string });
        }
        if (typeField === FormFields.CheckBoxField) {
            setTask({ ...taskForm, done: value as boolean });
        }
    }

    /* Modifier la tâche */
    function modifyTask(event: any) {
        event.preventDefault();
        setTitleVisible('titleErrorHidden');
        setDateVisible('dateErrorHidden');

        let validate = true;
        //vérifier que le title n'est pas vide
        if (taskForm.title === '') {
            //si erreur l'intitulé montrer l'erreur
            setTitleVisible('titleErrorVisible');
            validate = false;
        }

        if (taskForm.dateTask === '') {
            //si erreur date montrer l'erreur
            setDateVisible('dateErrorVisible');
            validate = false;
        }

        //TODO
        //renvoyer l'objet tâche au parent pour modifier les données 
        //ensuite rappeler dans le parent la liste et l'afficher avec els donénes créé ou modifié 

        return validate;
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
                    <input type="date" value={taskForm.date} onChange={(event) => handleChange(event.target.value, FormFields.DateField)}
                        className="inputFormField" placeholder="Date jj/mm/aaaa *"></input>
                    <div className={dateVisible}>
                        Veuillez saisir le champ 'date'
                    </div>
                </div>
                <div>
                    <input type="checkbox" id="done" checked={taskForm.done}
                        onChange={(event) => handleChange(event.target.checked, FormFields.CheckBoxField)}
                        name="done"></input>
                    <label htmlFor="done">Done</label>
                </div>
                <div>
                    <input className="buttonValidate" type="submit" value={showButtonCreateOrModify} />
                </div>

            </form>

        </div>
    );
}

export default TaskFormObject;

// src/views/Tasks.tsx
import React, { useState } from 'react';

const TaskForm: React.FC = () => {
    //gestion des erreurs
    const [titleVisible, setTitleVisible] = useState('titleErrorHidden');
    const [dateVisible, setDateVisible] = useState('dateErrorHidden');

    //state pour les champs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTask, setDateTask] = useState('');
    const [done, setDone] = useState(false);

    //enum pour les type des champs
    enum FormFields {
        StringField,
        TextAreaField,
        DateField,
        CheckBoxField,
    }

    function handleChange<T>(value: T, typeField: number): void {
        if (typeField === FormFields.StringField) {
            setTitle(value as string);
        }
        if (typeField === FormFields.TextAreaField) {
            setDescription(value as string);
        }
        if (typeField === FormFields.DateField) {
            setDateTask(value as string);
        }
        if (typeField === FormFields.CheckBoxField) {
            setDone(value as boolean);
        }
    }



    function modifyTask(event: any) {
        event.preventDefault();
        setTitleVisible('titleErrorHidden');
        setDateVisible('dateErrorHidden');

        let validate = true;
        //vérifier que le title n'est pas vide
        if (title === '') {
            //si erreur l'intitulé montrer l'erreur
            setTitleVisible('titleErrorVisible');
            validate = false;
        }

        if (dateTask === '') {
            //si erreur date montrer l'erreur
            setDateVisible('dateErrorVisible');
            validate = false;
        }

        return validate;

    }

    //au dessous c'est les traitements
    //en dessous c'est render
    return (
        <div className="">
            <form onSubmit={modifyTask}>
                <div>
                    <input onChange={(event) => handleChange(event.target.value, FormFields.StringField)} type="text" value={title} className="inputFormField" placeholder="Intitulé *"></input>
                    <div className={titleVisible}>
                        Veuillez saisir le champ 'intitulé'
                    </div>
                </div>
                <div>
                    <textarea value={description} onChange={(event) => handleChange(event.target.value, FormFields.TextAreaField)}
                        placeholder="Description" rows={10} className="inputFormField"></textarea>
                </div>
                <div>
                    <input type="date" value={dateTask} onChange={(event) => handleChange(event.target.value, FormFields.DateField)} className="inputFormField" placeholder="Date jj/mm/aaaa *"></input>
                    <div className={dateVisible}>
                        Veuillez saisir le champ 'date'
                    </div>
                </div>
                <div>
                    <input type="checkbox" id="done" checked={done} onChange={(event) => handleChange(event.target.checked, FormFields.CheckBoxField)}
                        name="done"></input>
                    <label htmlFor="done">Done</label>
                </div>
                <div>
                    <input className="buttonValidate" type="submit" value="Valider" />
                </div>


            </form>

        </div>
    );
}

export default TaskForm;

import styles from './App.module.scss';
import {SideBar} from "./components/SideBar/SideBar";
import {NotesList} from "./components/NotesList/NotesList";
import {NoteArea} from "./components/Note/NoteArea";
import React, {createContext, useEffect, useState} from "react";
import {DeleteModal} from "./components/DeleteModal/DeleteModal";
import moment from "moment";
import {initDB, addData, getStoreData, deleteData, changeNoteText} from "./dbconfig";

export const Context = createContext()

initDB()

function App() {
    const [notes, setNotes] = useState([])
    const [isCurrentNote, setIsCurrentNote] = useState(() => {
        const saved = localStorage.getItem('id')
        const initialValue = saved ? saved : null
        return Number(initialValue)
    })
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [search, setSearch] = useState('')
    let note = {name: 'Default Name', id: Date.now(), date: `${moment()}`, text: ''}

    const handleGetUsers = async () => {
        const data = await getStoreData('Notes');
        setNotes(data)
    };

    useEffect(()=>{
        handleGetUsers()
    }, [])



    const AddNewNote =  async () => {
        try {
            const res = await addData('Notes' , note)
        }catch (e) {
            console.log(e)
        }
        setNotes([note, ...notes])
    }

    const DeleteNote = async (id) => {
        try {
            await deleteData('Notes' , id)
        }
        catch (e) {
            console.log(e)
        }
        notes.find(el => el.id === isCurrentNote).text = ''
        setNotes(notes.filter(el => el.id !== id))
        localStorage.setItem('id', null)
        setIsCurrentNote(null)
        setIsDeleteModalOpen(false)
        setIsEditable(false)
    }

    const ChangeTextNote = async (text) => {
        let note = notes.find(el => el.id === isCurrentNote)
        note.text = text
        try {
            await changeNoteText('Notes' , {id: isCurrentNote, text: text, name: note.name, date: note.date})
        }
        catch (e) {
            console.log(e)
        }
        setNotes(notes)
    }

    const ChangeNameNote = async (name) => {
        let note = notes.find(el => el.id === isCurrentNote)
        note.name = name
        try {
            await changeNoteText('Notes' , {id: isCurrentNote, text: note.text, name: name, date: note.date})
        }
        catch (e) {
            console.log(e)
        }
        setNotes(notes)
    }

    function CurrentNoteArea() {
        let note = notes.find(el => el.id === isCurrentNote)
        return note
    }

    const store = {
        isCurrentNote: isCurrentNote,
        notes: notes,
        isEditable: isEditable,
        search: search,
        setIsEditable: setIsEditable,
        setSearch: setSearch,
        setIsDeleteModalOpen: setIsDeleteModalOpen
    }

    useEffect(() => {
        setIsEditable(false)
    }, [isCurrentNote]);
    return (
        <Context.Provider value={store}>
            <div className={styles.App}>
                <SideBar AddNewNote={AddNewNote}/>
                <div className={styles.body}>
                    <NotesList
                        ChangeTextNote={ChangeTextNote}
                        ChangeNameNote={ChangeNameNote}
                        setIsCurrentNote={setIsCurrentNote}
                    />
                    <div className={styles.textAreaBlock}>
                        {
                            isCurrentNote && notes.find(el => el.id === isCurrentNote)
                                ? <p>
                                    <span>Note: {CurrentNoteArea().name.slice(0, 25)}</span> - {moment(new Date(CurrentNoteArea().date)).format('MMMM Do YYYY, h:mm:ss a')}
                                </p>
                                : null
                        }
                        {isCurrentNote
                            ? <NoteArea ChangeTextNote={ChangeTextNote} note={CurrentNoteArea()}/>
                            : ''
                        }

                    </div>
                </div>
                {
                    isDeleteModalOpen && <DeleteModal DeleteNote={DeleteNote}/>
                }
            </div>
        </Context.Provider>
    );
}

export default App;

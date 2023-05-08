import styles from './App.module.scss';
import {SideBar} from "./components/SideBar/SideBar";
import {NotesList} from "./components/NotesList/NotesList";
import {NoteArea} from "./components/Note/NoteArea";
import React, {createContext, useEffect, useState} from "react";
import {DeleteModal} from "./components/DeleteModal/DeleteModal";
import moment from "moment";
import {DBConfig} from './dbconfig';
import {initDB, useIndexedDB} from 'react-indexed-db';

initDB(DBConfig);
export const Context = createContext()

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
    const {add, getAll, deleteRecord, update} = useIndexedDB('notes');
    let note = {name: 'Default Name', id: Date.now(), date: `${moment()}`, text: ''}


    useEffect(() => {
        getAll().then(notesFromDB => {
            setNotes(notesFromDB);
        });
    }, [])

    const AddNewNote = () => {
        add(note).then()
        setNotes([note, ...notes])
    }
    const DeleteNote = (id) => {
        notes.find(el => el.id === isCurrentNote).text = ''
        setNotes(notes.filter(el => el.id !== id))
        localStorage.setItem('id', null)
        setIsCurrentNote(null)
        setIsDeleteModalOpen(false)
        setIsEditable(false)
        deleteRecord(id).then()
    }

    const ChangeTextNote = (text) => {
        let note = notes.find(el => el.id === isCurrentNote)
        note.text = text
        update({id: isCurrentNote, text: text, name: note.name, date: note.date}).then();
        setNotes(notes)
    }

    const ChangeNameNote = (name) => {
        let note = notes.find(el => el.id === isCurrentNote)
        note.name = name
        update({id: isCurrentNote, text: note.text, name: name, date: note.date}).then();
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

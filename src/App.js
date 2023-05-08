import styles from './App.module.scss';
import {SideBar} from "./components/SideBar/SideBar";
import {NotesList} from "./components/NotesList/NotesList";
import {NoteArea} from "./components/Note/NoteArea";
import {useEffect, useState} from "react";
import {DeleteModal} from "./components/DeleteModal/DeleteModal";

function App() {
    const [notes , setNotes] = useState([])
    const [isCurrentNote , setIsCurrentNote] = useState('')
    const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false)
    const [isEditable , setIsEditable] = useState(false)
    let note = {name:'Default Name' , date: new Date().toDateString() , id: Date.now(),  text : 'Some Text'}

    const request = window.indexedDB.open('Notes Manager' , 3)
    request.onerror = (event)=>{
        console.log(event)
    }
    request.onupgradeneeded = () => {
        const db = request.result
        const store = db.createObjectStore('notes',{keyPath:"id"})
        store.createIndex('note_name_text_date_id' , ['name' , 'text','date', 'id'] , {unique:false})

    }
    const AddNewNote = () =>{
        setNotes([note,...notes])
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('notes', "readwrite");
            const store = transaction.objectStore('notes')
            const noteIndex = store.index('note_name_text_date_id')
            store.add(note)
        }
    }
    const DeleteNote = (id) => {
        notes.find(el => el.id === isCurrentNote).text = ''
        setNotes(notes.filter(el => el.id !== id))
        setIsCurrentNote('')
        setIsDeleteModalOpen(false)
        setIsEditable(false)
    }
    function CurrenNoteArea(){
        let note = notes.find(el=> el.id === isCurrentNote)
        return note
    }

    useEffect(() => {
        setIsEditable(false)
    }, [isCurrentNote]);



  return (
    <div className={styles.App}>
        <SideBar
            AddNewNote={AddNewNote}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            isCurrentNote={isCurrentNote}
            setIsEditable={setIsEditable}
            isEditable={isEditable}
        />
        <div className={styles.body}>
            <NotesList
                notes={notes}
                setNotes={setNotes}
                isCurrentNote={isCurrentNote}
                setIsCurrentNote={setIsCurrentNote}
            />
            <div className={styles.textAreaBlock}>
                <NoteArea
                    note={CurrenNoteArea()}
                    notes = {notes}
                    setNotes={setNotes}
                    isEditable={isEditable}
                />
            </div>
        </div>
        {isDeleteModalOpen &&
            <DeleteModal
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                isCurrentNote={isCurrentNote}
                DeleteNote={DeleteNote}
            />}
    </div>
  );
}

export default App;

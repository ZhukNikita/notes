import styles from "./NotesList.module.scss";
import {useState} from "react";


export const Note = ({notes, setNotes ,setIsCurrentNote , isCurrentNote ,el }) =>{

    const [isNameEdit , setIsNameEdit] = useState(false)
    const [newName , setNewName] = useState('')
    const BlurHandle = (id) => {
        notes.find((el)=> el.id === id).name = newName
        setNotes(notes)
        setIsNameEdit(false)
        setNewName('')
    }
    const onKeyDown = (e , id) =>{
        if(e.key === "Enter") BlurHandle(id)
    }

    return (
        <div onClick={()=>setIsCurrentNote(el.id)} className={styles.note} style ={isCurrentNote===el.id?{backgroundColor:'lightgrey'}:{}}>
            {!isNameEdit && <h2 onClick={()=>setIsNameEdit(true)}>{el.name || 'Default Name'}</h2>}
            {isNameEdit && <input
                onBlur={()=>BlurHandle(el.id)}
                onKeyDown={(e )=> onKeyDown(e , el.id)}
                style={{marginTop:'19.92px'}}
                type="text"
                onChange={e=>setNewName(e.target.value)} value={newName}
                autoFocus={true}
            />}
            <p>{el.date}</p>
        </div>
    )
}

import styles from './NotesList.module.scss'
import {Note} from "./Note";

export const NotesList = ({notes , setNotes , isCurrentNote , setIsCurrentNote}) =>{


    return(
        <div className={styles.body}>
            {
                notes.map(el=>(
                    <Note setIsCurrentNote={setIsCurrentNote} isCurrentNote={isCurrentNote} notes={notes} setNotes={setNotes} el={el} key={el.id}/>
                ))
            }
        </div>
    )
}
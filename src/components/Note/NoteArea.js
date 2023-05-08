import styles from './Note.module.scss'
import {useState} from "react";

export const NoteArea = ({note , isEditable }) => {
    const [text , setText] = useState('')
    function textHandler(e) {
        setText(e.target.value)
        note.text = e.target.value
    }

    return (
        <div className={styles.body}>
            {
                isEditable
                    ? <textarea
                        onChange={e => textHandler(e)}
                        disabled={false}
                        cols="30"
                        rows="10"
                        value={note?.text}
                    >
                        {note?.text}
                    </textarea>
                    : <textarea
                        onChange={e => textHandler(e)}
                        disabled={true}
                        cols="30"
                        rows="10"
                        value={note?.text}
                    >
                        {note?.text}
                    </textarea>
            }
        </div>
    )
}
import styles from './Note.module.scss'
import {useContext, useEffect, useState} from "react";
import {Context} from "../../App";

export const NoteArea = ({note, ChangeTextNote }) => {
    const [text , setText] = useState( '')
    const {isEditable} = useContext(Context);

    function textHandler(e) {
        setText(e.target.value)
        ChangeTextNote(e.target.value)

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
                        placeholder={'Your Text'}
                    >
                        {note?.text}
                    </textarea>
                    : <textarea
                        onChange={e => textHandler(e)}
                        disabled={true}
                        cols="30"
                        rows="10"
                        value={note?.text}
                        placeholder={'Your Text'}

                    >
                        {note?.text}
                    </textarea>
            }
        </div>
    )
}
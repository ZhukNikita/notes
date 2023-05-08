import styles from './DeleteModal.module.scss'
import {useContext} from "react";
import {Context} from "../../App";


export const DeleteModal = ({DeleteNote }) =>{
    const {isCurrentNote ,setIsDeleteModalOpen } = useContext(Context);

    return(
        <div className={styles.deleteModal}>
            <h2>Ви впевнені, щодо видалення цієї нотатки?</h2>
            <div>
                <button onClick={()=> DeleteNote(isCurrentNote)}>Так</button>
                <button onClick={()=>setIsDeleteModalOpen(false)}>Ні</button>
            </div>
        </div>
    )
}
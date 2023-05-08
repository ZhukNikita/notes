import styles from './DeleteModal.module.scss'


export const DeleteModal = ({setIsDeleteModalOpen , isCurrentNote , DeleteNote }) =>{
    return(
        <div className={styles.deleteModal}>
            <h2>Ви впевнені, щодо видалення цієї нотатки?</h2>
            <button onClick={()=> DeleteNote(isCurrentNote)}>Так</button>
            <button onClick={()=>setIsDeleteModalOpen(false)}>Ні</button>
        </div>
    )
}
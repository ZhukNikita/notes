import styles from "./NotesList.module.scss";
import {useState} from "react";
import moment from "moment";


export const Note = ({setIsCurrentNote , isCurrentNote ,el , isOpenMobileNote , setIsOpenMobileNote , ChangeNameNote }) =>{
    const [isNameEdit , setIsNameEdit] = useState(false)
    const [newName , setNewName] = useState(el.name)
    const BlurHandle = () => {
        setIsNameEdit(false)
        if(!newName) ChangeNameNote('Default Name')
        else ChangeNameNote(newName)
    }
    const onKeyDown = (e) =>{
        if(e.key === "Enter") BlurHandle()
    }
    function onClick (){
        setIsOpenMobileNote(!isOpenMobileNote)
        localStorage.setItem('id' , el.id)
        setIsCurrentNote(el.id)
    }

    return (
        <div onClick={onClick} className={styles.note} style ={isCurrentNote===el.id?{backgroundColor:'lightgrey'}:{}}>
            {!isNameEdit && <h2 className={styles.desktopSize} onClick={()=>setIsNameEdit(true)}>{el.name.length > 12 ? el.name.slice(0,12) + '...' : el.name || 'Default Name'}</h2>}
            {!isNameEdit && <h2 className={styles.mobileSize} onClick={()=>setIsNameEdit(true)}>{el.name.length > 23 ? el.name.slice(0,23) + '...' : el.name || 'Default Name'}</h2>}
            {isNameEdit && <input
                onBlur={()=>BlurHandle(el.id)}
                onKeyDown={(e )=> onKeyDown(e , el.id)}
                style={{marginTop:'19.92px'}}
                type="text"
                value={newName}
                onChange={e=> {
                    setNewName(e.target.value)
                }}
                autoFocus={true}
            />}
            <p style={{fontSize:'10px' , marginTop:'3px', marginBottom:'3px'}}>(click on the name to rename note)</p>
            <p>{moment(new Date(el.date)).format("MMM Do YY")}</p>
        </div>
    )
}

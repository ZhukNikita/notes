import styles from './NotesList.module.scss'
import {Note} from "./Note";
import {NoteArea} from "../Note/NoteArea";
import {useContext, useState} from "react";
import {Context} from "../../App";

export const NotesList = ({setIsCurrentNote  ,  ChangeNameNote , ChangeTextNote}) =>{
    const [isOpenMobileNote , setIsOpenMobileNote] = useState(false)
    const { isCurrentNote,notes,search , setSearch} = useContext(Context);


    const sortArr = notes.sort((a,b)=> b.id - a.id).filter(el=> {
        let priority = el.name.toLowerCase().includes(search.toLowerCase())
        return priority
    })

    return(
        <div className={styles.body}>
            {
                sortArr.map(el=>(
                    <div key={el.id}>
                        <Note
                            ChangeNameNote={ChangeNameNote}
                            setIsOpenMobileNote={setIsOpenMobileNote}
                            isOpenMobileNote={isOpenMobileNote}
                            setIsCurrentNote={setIsCurrentNote}
                            isCurrentNote={isCurrentNote}
                            el={el}

                        />
                        { isOpenMobileNote && isCurrentNote === el.id &&
                            <div className={styles.mobileArea} >
                                <NoteArea note={el} ChangeTextNote={ChangeTextNote}
                                />
                            </div>
                        }

                    </div>
                ))
            }
            {
                sortArr.length < notes.length &&
                ( <div onClick={()=>setSearch('')} style={{textAlign:'center', width:'100%' , backgroundColor:'lightgray',borderTop:"1px solid black" , padding:'10px 0px' , fontWeight:'bold', textDecoration:'underline' , cursor:'pointer'}}>More</div> )
            }
        </div>
    )
}

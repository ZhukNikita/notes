import styles from './SideBar.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {SearchBox} from "./SearchBox";
import EditOffIcon from '@mui/icons-material/EditOff';
import {useContext} from "react";
import {Context} from "../../App";
export const SideBar = ({AddNewNote}) => {
    const { isCurrentNote , isEditable , setIsEditable , setIsDeleteModalOpen} = useContext(Context);
    return(
      <div className={styles.body}>
          <div className={styles.buttons}>
              <button onClick={AddNewNote}><AddIcon sx={{color:'black'}}/></button>
              {
                  isCurrentNote
                      ? <>
                          <button onClick={() => setIsDeleteModalOpen(true)}><DeleteIcon sx={isCurrentNote?{color:'black'}:{color:'lightgray'}}/></button>
                          {
                              isEditable
                              ? <button onClick={()=> setIsEditable(false)}><EditOffIcon sx={isCurrentNote?{color:'black'}:{color:'lightgray'}}/></button>
                              : <button onClick={()=> setIsEditable(true)}><EditIcon sx={isCurrentNote?{color:'black'}:{color:'lightgray'}}/></button>
                          }
                        </>
                      : <>
                          <button><DeleteIcon sx={{color:'lightgray'}}/></button>
                          <button><EditIcon sx={{color:'lightgray'}}/></button>
                        </>
              }
          </div>
          <SearchBox/>
      </div>
  )
}
import styles from './SideBar.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {SearchBox} from "./SearchBox";
export const SideBar = () => {
  return(
      <div className={styles.body}>
          <div className={styles.buttons}>
              <button><AddIcon sx={{color:'black'}}/></button>
              <button><DeleteIcon sx={{color:'black'}}/></button>
              <button><EditIcon sx={{color:'black'}}/></button>
          </div>
          <SearchBox/>
      </div>
  )
}
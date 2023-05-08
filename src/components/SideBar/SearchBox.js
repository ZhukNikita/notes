import styles from './SearchBox.module.scss'
import {useContext} from "react";
import {Context} from "../../App";

export const SearchBox =  ()=>{
    const { search , setSearch } = useContext(Context);

    return(
        <input
            type="text"
            name="search"
            onChange={e=>setSearch(e.target.value)}
            className={styles.search}
            value={search}
            placeholder="&#xf002; Search"
            style={{fontFamily: "Arial, 'Font Awesome 5 Free'"}} // for search Icon
        />
    )
}
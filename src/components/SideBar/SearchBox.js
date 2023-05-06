import styles from './SearchBox.module.scss'

export const SearchBox =  ()=>{
    return(
        <input type="text" name="search" className={styles.search} placeholder="&#xf002; Search" style={{fontFamily: "Arial, 'Font Awesome 5 Free'"}}/>
    )
}
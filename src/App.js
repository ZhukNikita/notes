import styles from './App.module.scss';
import {SideBar} from "./components/SideBar/SideBar";
import {NotesList} from "./components/NotesList/NotesList";
import {Note} from "./components/Note/Note";

function App() {
  return (
    <div className={styles.App}>
        <SideBar/>
        <div className={styles.body}>
            <NotesList/>
            <Note/>
        </div>
    </div>
  );
}

export default App;

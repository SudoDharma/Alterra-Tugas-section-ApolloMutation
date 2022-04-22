import styles from "./style.module.css"

import { useParams } from "react-router-dom"

import { GET_PENGUNJUNG_BY_PK } from "../../queries/pengunjung"

import Input from "../../component/Input"
import List from "../../component/List"
import BackButton from "../../component/BackButton"

const Search = () => {
    const param = useParams()

    return(
        <div className={styles.container}>
            <BackButton/>
            <h1>Daftar Pengunjung</h1>
            <h3>Stasiun Gubeng</h3>
            <p>Pencarian dengan ID : {param.id}</p>

            <Input id={param.id} />
            <List query={GET_PENGUNJUNG_BY_PK} id={param.id}/>
        </div>
    )
}

export default Search
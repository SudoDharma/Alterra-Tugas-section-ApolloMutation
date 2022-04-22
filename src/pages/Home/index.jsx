import styles from "./style.module.css"

import { useNavigate } from "react-router-dom";

import { GET_PENGUNJUNG } from "../../queries/pengunjung";

import Input from "../../component/Input"
import List from "../../component/List"

const Home = () => {

    const navigate = useNavigate()

    return(
        <div className={styles.container}>
            <h1>Daftar Pengunjung</h1>
            <h3>Stasiun Gubeng</h3>
            <Input/>
            <List query={GET_PENGUNJUNG}/>

            <button onClick={() => navigate("/add", {
                    state: {
                        nama: "",
                        umur: 0,
                        jenis_kelamin: ""
                    }
                })
            }>Tambah pengunjung</button>
        </div>
    )
}

export default Home
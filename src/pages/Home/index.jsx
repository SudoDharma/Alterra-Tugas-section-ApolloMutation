import { useEffect } from "react";

import styles from "./style.module.css"

import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_PENGUNJUNG } from "../../queries/pengunjung";

import Input from "../../component/Input"
import List from "../../component/List"

const Home = () => {

    const navigate = useNavigate()

    const {data, loading, error, refetch} = useQuery(GET_PENGUNJUNG)

    useEffect(() => {
        refetch()
    },[])

    return(
        <div className={styles.container}>
            <h1>Daftar Pengunjung</h1>
            <h3>Stasiun Gubeng</h3>
            <Input/>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <List data={data.pengunjung}/>
            )}

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
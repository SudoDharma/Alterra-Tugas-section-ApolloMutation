import { useEffect } from "react"

import styles from "./style.module.css"

import { useParams, useLocation } from "react-router-dom"

import { useLazyQuery } from "@apollo/client"
import { GET_PENGUNJUNG_BY_PK } from "../../queries/pengunjung"

import Input from "../../component/Input"
import List from "../../component/List"
import BackButton from "../../component/BackButton"

const Search = () => {
    const param = useParams()
    const location = useLocation()

    const [get_pengunjung_by_pk,{ data, loading, error, refetch }] = useLazyQuery(GET_PENGUNJUNG_BY_PK)

    useEffect(() => {
        get_pengunjung_by_pk({
            variables: {id: param.id}
        })
    },[location])

    useEffect(() => {
        refetch()
    },[data])

    return(
        <div className={styles.container}>
            <BackButton/>
            <h1>Daftar Pengunjung</h1>
            <h3>Stasiun Gubeng</h3>
            <p>Pencarian dengan ID : {param.id}</p>

            <Input id={param.id} />
            {loading || data === undefined ? (
                <h1>Loading...</h1>
            ) : (
                <List data={[data.pengunjung_by_pk]}/>
            )}
        </div>
    )
}

export default Search
import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { DELETE_PENGUNJUNG } from "../../queries/pengunjung";

import styles from "./style.module.css"

const List = ({query, id}) => {

    const location = useLocation()
    const navigate = useNavigate()

    const [pengunjung, setPengunjung] = useState()

    const [get_pengunjung, {data, loading, error, refetch}] = useLazyQuery(query, {
        onCompleted: (data) => {
            if(id === undefined){
                const newData = [...data.pengunjung]
                setPengunjung(newData)
            }
            else{
                const newData = [data.pengunjung_by_pk]
                setPengunjung(newData)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [delete_pengunjung, {loading: deleteLoading}] = useMutation(DELETE_PENGUNJUNG, {
        onCompleted: (data) => {
            alert("Data berhasil dihapus")
            refetch()
        },
        onError: (error) => {
            alert("Gagal menghapus data")
            console.log(error)
        }
    })

    useEffect(() => {
        if(id === undefined){
            get_pengunjung()
        }
        else{
            get_pengunjung({variables: {id: id}})
        }
    },[location])

    const handleDelete = (id) => {
        delete_pengunjung({
            variables: {
                id: id
            }
        })
    }
    
    return (
        <div className={styles.container}>
            { pengunjung === undefined || loading ? (
                <h1>Loading...</h1>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama</th>
                            <th>Umur</th>
                            <th>Jenis Kelamin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pengunjung[0] === null || pengunjung.length === 0 ? (
                            <tr>
                                <td colSpan={5}>Tidak ada data</td>
                            </tr>
                        ) : (
                            pengunjung.map((item, itemIdx) => (
                                <tr key={itemIdx}>
                                    <td>{item.id}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.umur}</td>
                                    <td>{item.jenis_kelamin}</td>
                                    <td>
                                        <button onClick={() => navigate("/edit", {
                                                state: {
                                                    id: item.id,
                                                    nama: item.nama,
                                                    umur: item.umur,
                                                    jenis_kelamin: item.jenis_kelamin
                                                }
                                            })}>Edit
                                        </button>
                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
  }

export default List
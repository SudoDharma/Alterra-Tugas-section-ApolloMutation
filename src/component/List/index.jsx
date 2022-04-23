import { useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { GET_PENGUNJUNG, DELETE_PENGUNJUNG } from "../../queries/pengunjung";

import styles from "./style.module.css"

const List = ({data}) => {
    const navigate = useNavigate()

    const { refetch } = useQuery(GET_PENGUNJUNG)

    const [delete_pengunjung, {loading: deleteLoading}] = useMutation(DELETE_PENGUNJUNG, {
        onCompleted: (data) => {
            alert("Data berhasil dihapus")
            navigate("/")
            refetch()
        },
        onError: (error) => {
            alert("Gagal menghapus data")
            console.log(error)
        }
    })

    const handleDelete = (id) => {
        delete_pengunjung({
            variables: {
                id: id
            }
        })
    }
    
    return (
        <div className={styles.container}>
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
                    {data[0] === null || data.length === 0 ? (
                        <tr>
                            <td colSpan={5}>Tidak ada data</td>
                        </tr>
                    ) : (
                        data.map((item, itemIdx) => (
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
        </div>
                                    
    )
  }

export default List
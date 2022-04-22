import { useState, useEffect } from "react"

import { useLocation } from "react-router-dom"

import { useMutation } from "@apollo/client"
import { INSERT_PENGUNJUNG, UPDATE_PENGUNJUNG } from "../../queries/pengunjung"

import styles from "./style.module.css"

const Form = () => {

    const location = useLocation()

    const [input, setInput] = useState({})

    const [insert_pengunjung, {loading: insertLoading}] = useMutation(INSERT_PENGUNJUNG, {
        onCompleted: (data) => {
            alert("Data berhasil dimasukan")
        },
        onError: (error) => {
            alert("Gagal menambahkan data")
            console.log(error)
        }
    })

    const [update_pengunjung, {loading: updateLoading}] = useMutation(UPDATE_PENGUNJUNG,{
        onCompleted: (data) => {
            alert("Data berhasil diperbarui")
        },
        onError: (error) => {
            alert("Terjadi kesalahan")
            console.log(error)
        }
    })

    useEffect(() => {
        const newInput = {...location.state}
        setInput(newInput)
    },[])

    const handleChange = (e) => {
        const newInput = {...input}
        newInput[e.target.name] = e.target.value

        setInput(newInput)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(location.pathname === "/add"){
            insert_pengunjung({
                variables: {
                    object: {...input}
                }
            })
    
            setInput({
                nama: "",
                umur: 0,
                jenis_kelamin: ""
            })
        }
        else if(location.pathname === "/edit"){
            update_pengunjung({
                variables: {...input}
            })
        }
    }

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
            <label>Nama:</label>
            <input type="text" name="nama" value={input.nama} onChange={(e) => handleChange(e)} required/>
            <label>Umur:</label>
            <input type="number" name="umur" value={input.umur} onChange={(e) => handleChange(e)} required/>
            <label>Jenis kelamin:</label>
            <div>
                <label>
                    <input type="radio" name="jenis_kelamin" value="Pria" 
                    checked={input.jenis_kelamin === "Pria"} onChange={(e) => handleChange(e)} required/>Pria
                </label>

                <label>
                    <input type="radio" name="jenis_kelamin" value="Wanita" 
                    checked={input.jenis_kelamin === "Wanita"} onChange={(e) => handleChange(e)} required/>Wanita
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default Form
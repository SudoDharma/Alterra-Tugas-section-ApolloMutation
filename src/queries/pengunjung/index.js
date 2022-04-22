import { gql } from "@apollo/client";

export const GET_PENGUNJUNG = gql`
    query get_pengunjung {
        pengunjung{
            id
            nama
            umur
            jenis_kelamin
        }
    }
`

export const GET_PENGUNJUNG_BY_PK = gql`
    query get_Pengunjung_by_pk($id: Int!) {
        pengunjung_by_pk(id: $id) {
            id
            jenis_kelamin
            nama
            umur
        }
    }
`

export const INSERT_PENGUNJUNG = gql`
    mutation insert_pengunjung($object: pengunjung_insert_input!){
        insert_pengunjung_one(object: $object){
            nama
        }
    }
`

export const UPDATE_PENGUNJUNG = gql`
    mutation update_pengunjung($id: Int!, $nama: String, $umur: Int, $jenis_kelamin: String){
        update_pengunjung_by_pk(pk_columns: {id: $id}, _set: {
            nama: $nama,
            umur: $umur,
            jenis_kelamin: $jenis_kelamin
        }) {
            id
        }
    }
`

export const DELETE_PENGUNJUNG = gql`
    mutation delete_pengunjung($id: Int!){
        delete_pengunjung_by_pk(id: $id){
            nama
        }
    }
`
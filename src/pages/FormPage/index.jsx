import styles from "./style.module.css"

import Form from "../../component/Form"
import BackButton from "../../component/BackButton"

const FormPage = ({header}) => {
    return(
        <div className={styles.container}>
            <BackButton/>
            <h1>{header}</h1>
            <Form/>
        </div>
    )   
}

export default FormPage
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

const Input = () => {

  const navigate = useNavigate()
  const param = useParams()

  const [input, setInput] = useState({
    id: 0,
  })

  useEffect(() => {
    if(param.id !== undefined){
      setInput({id: param.id})
    }
  },[])

  const handleChange = (e) => {
    const newInput = {...input}
    newInput[e.target.name] = e.target.value

    setInput(newInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    navigate("/search/" + input.id)
  }

  return (
    <div className="inputan">
      <form onSubmit={handleSubmit}>
        <label>Search by ID: </label>
        <input type="number" name="id" value={input.id} onChange={(e) => handleChange(e)} required/>
      </form>
    </div>
  )
}

export default Input

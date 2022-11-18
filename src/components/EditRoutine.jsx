import React, { useEffect, useState } from "react";
import { updateRoutine } from "../api-adapter";
import { useParams } from "react-router-dom"

const EditRoutine = () => {

  const {routineid} = useParams()
  console.log(routineid)
  const token = localStorage.getItem("token")

  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  // const [isPublic, setIsPublic] = useState(true)

  const editedRoutine = {name, goal, routineid, token}

  // useEffect(() => {
  async function handleSubmit (event) {
    event.preventDefault()
    const update = await updateRoutine(editedRoutine)
  }
  // handleSubmit()
// }, []) 

return (
  <div>
    <h1>Edit Routine</h1>
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
      type="text"
      placeholder="name"
      value={name}
      onChange={(event) => {
        setName((event.target.value))
      }}
      required
      />
      <label>Goal: </label>
      <input
        type="text"
        placeholder="goal"
        name="goal"
        value={goal}
        onChange={(event) => {
          setGoal((event.target.value))
        }}
      />
      <button type="submit">Submit</button>
    </form>
  </div>
)

}

export default EditRoutine
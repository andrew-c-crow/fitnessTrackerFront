import React, { useEffect, useState } from "react";
import { updateRoutine } from "../api-adapter";
import { useParams } from "react-router-dom"
import DeleteButton from "./DeleteButton";

const EditRoutine = (props) => {
  const {routineid} = useParams()
  console.log(routineid)
  const token = localStorage.getItem("token")
  const filteredRoutines = props.routineData.filter((e) => {
    if (e.id == routineid) {
      console.log('yooooohoooo')
      return true
    }
  })

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
console.log(filteredRoutines)
return filteredRoutines ? (
  <div key={routineid}>
  <div>
    <h1>Edit Routine</h1>
    <div>
      <div><span>Current Name: </span>{filteredRoutines[0]}</div>
      <div><span>Current Goal: </span> {filteredRoutines[0]}</div>
    </div>
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
  <div>
    <DeleteButton routineid={routineid} />
  </div>
  </div>
) : null;
}

export default EditRoutine
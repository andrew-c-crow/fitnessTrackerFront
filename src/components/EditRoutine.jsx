import React, { useEffect, useState } from "react";
import { updateRoutine } from "../api-adapter";
import { useParams } from "react-router-dom"
import DeleteButton from "./DeleteButton";

const EditRoutine = (props) => {
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [filteredRoutines, setFilteredRoutines] = useState({})

  const {routineid} = useParams()

  console.log(routineid)

  useEffect(() => {
    // console.log(props.routineData)
    const filteredData = props.routineData.find((e) => {
      // console.log(e)
      if (e.id == routineid) {
        console.log('yooooohoooo')
        return true
      }
    })
    console.log(filteredData)
    setFilteredRoutines(filteredData)
  }, [props.routineData])

  // const [isPublic, setIsPublic] = useState(true)

  

  // useEffect(() => {
   
  async function handleSubmit (event) {
    event.preventDefault()
    const token = localStorage.getItem("token")
    const editedRoutine = {name, goal, routineid, token}
    const update = await updateRoutine(editedRoutine)
  }
  // handleSubmit()
// }, []) 
console.log(filteredRoutines)
return  (
  <div key={routineid}>
  <div>
    <h1>Edit Routine</h1>
    <div>
      <div><span>Current Name: </span>{filteredRoutines.name}</div>
      <div><span>Current Goal: </span> {filteredRoutines.goal}</div>
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
) 
// : 
{/* <p>These are not the routines you are looking for</p>; */}
}

export default EditRoutine
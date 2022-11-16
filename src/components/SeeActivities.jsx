import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const SeeActivities = (props) => {
  const {id} = useParams()
  const filteredActivities= props.routineData.filter((element) => {
    console.log(element.id)
    if (element.id == id) {

      return true
    }
  })
  return filteredActivities ? (
    <div key={id}>
      <div>
        <h3>Name: {filteredActivities.name}</h3>
      </div>
    </div>
  ) : null

}

export default SeeActivities
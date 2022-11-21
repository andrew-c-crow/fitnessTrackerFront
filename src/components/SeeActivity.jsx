import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteActivityButton from "./DeleteActivityButton";

const SeeActivity = (props) => {
  const {activityid} = useParams()

  // console.log(activityid)

  const [singleActivity, setSingleActivity] = useState({})

  // console.log(singleActivity)

  useEffect(() => {
  const filteredActivity = props.activitiesData.find((e) => {
    // console.log(e)
    if (e.id == activityid) {
      // console.log("if statement working")
      return true;
    }
  })
  setSingleActivity(filteredActivity)
}, [])
  // console.log(props.activitiesData[0])
  // console.log(activityArray)
  return singleActivity ? (
    <div key={singleActivity.id} className="singleActivity">
      <div className="activityName">Name:  
        {singleActivity.name.toUpperCase()}
      </div>
      <div className="activityDesc">Description:  
        {singleActivity.description.toLowerCase()}
      </div>
      <DeleteActivityButton activityid={activityid}/>
    </div>
  ) : null
}

export default SeeActivity
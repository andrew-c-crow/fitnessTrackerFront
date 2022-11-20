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
    <div key={singleActivity.id} className="singleActivity">I am Working
      <div className="activityName">
        {singleActivity.name}
      </div>
      <div className="activityDesc">
        {singleActivity.description}
      </div>
      <DeleteActivityButton activityid={activityid}/>
    </div>
  ) : null
}

export default SeeActivity
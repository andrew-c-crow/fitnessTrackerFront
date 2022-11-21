import react from "react";
import { Link } from "react-router-dom";

const SeeActivityButton = (props) => {

  return <Link to={`/routines/myactivities/${props.activityid}`}>
    <button className="loginbutton">See Activity</button>
  </Link>

}

export default SeeActivityButton
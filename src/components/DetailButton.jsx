import React from "react";
import {Link} from 'react-router-dom'


const DetailButton = (props) => {

  return <Link to={`/routines/seeactivities/${props.routineId}`}>
    <button>See Activities</button>
  </Link>

}

export default DetailButton
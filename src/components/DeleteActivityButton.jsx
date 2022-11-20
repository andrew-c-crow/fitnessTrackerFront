import react from "react";
import {Link} from 'react-router-dom'
import { deleteActivitiesFromRoutines } from "../api-adapter";


const DeleteActivityButton = (props) => {
    const id = props.activityid;
    console.log(props, "props")
    const token = localStorage.getItem('token');
    const nuke = { id, token };

    async function nukeActivity(event) {
        event.preventDefault();
        const deletedActivity = await deleteActivitiesFromRoutines(nuke);
        console.log(deletedActivity, "leave us")
    }

  return <Link to={`/myActivitys`}>
    <button className='deleteButton' onClick={nukeActivity}>Delete Activity</button>
  </Link>
}

export default DeleteActivityButton
import react from "react";
import {Link} from 'react-router-dom'
import { deleteActivitiesFromRoutines } from "../api-adapter";


const DeleteActivityButton = (props) => {
    const id = props.routineid;
    const token = localStorage.getItem('token');
    const nuke = { id, token };

    async function nukeRoutine(event) {
        event.preventDefault();
        const deletedRoutine = await deleteActivitiesFromRoutines(nuke);
        console.log(deletedRoutine, "leave us")
    }

  return <Link to={`/myroutines`}>
    <button className='deleteButton' onClick={nukeRoutine}>Delete Activity</button>
  </Link>
}

export default DeleteActivityButton
import react from "react";
import {Link} from 'react-router-dom'
import { deleteRoutines } from "../api-adapter";


const DeleteButton = (props) => {
    const id = props.routineid;
    const token = localStorage.getItem('token');
    const obliterate = { id, token };

    async function obliterateRoutine(event) {
        event.preventDefault();
        const deletedRoutine = await deleteRoutines(obliterate);
        console.log(deletedRoutine, "leave us")
    }

  return <Link to={`/myroutines`}>
    <button className='deleteButton' onClick={obliterateRoutine}>Delete Routine</button>
  </Link>
}

export default DeleteButton
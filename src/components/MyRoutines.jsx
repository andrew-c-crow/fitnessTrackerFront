import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createRoutines,
  getProfile,
  getPublicRoutinesByUser,
  getActivities,
  addActivityToRoutine,
  updateRoutine,
} from "../api-adapter";
import { DetailButton, EditButton } from "./";

const MyRoutines = (props) => {
  const token = localStorage.getItem("token");
  // console.log(token)

  const [routineState, setRoutineState] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false); // will make changes later


  const createData = { name, goal, isPublic, token };

  async function handleSubmit(event) {
    event.preventDefault();
    const addPost = await createRoutines(createData);
  }

  const handleOnChange = () => {
    setIsPublic(!isPublic)
  }

  // Setter function on ActivityId is not running correctly. Must fix to allow activityId to pass correctly when adding activity to routine.

  useEffect(() => {
    async function getRoutineData() {
      const data = await getProfile(token);
      const username = data.username;
      const routines = await getPublicRoutinesByUser(token, username);
      setRoutineState(routines);
    }
    getRoutineData();
  }, []);

  function logOut() {
    localStorage.removeItem("token");
  }

  return token ? (
    <>
      <div >
        <h2 className="header">Create A Routine</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="goal"
              name="goal"
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            />
            <div className="isPublicTitle">
              Would you like your routine public?
            </div>
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              value="isPublic"
              public="false"
              onChange={handleOnChange}
            />
            <button type="submit">Create Routine</button>
          </form>
          <div>
            {routineState.map((routine, index) => {
              return  (
                <div className="MyRoutinesTitle">My Routines
                <div key={index} className="tabs">
                  <h3>{routine.name}</h3>
                  <h4>{routine.creatorName}</h4>
                  <h4>{routine.goal}</h4>
                  <DetailButton routineId={routine.id} />

                  <EditButton
                    routineId={routine.id}
                    routineName={routine.name}
                    routineGoal={routine.goal}
                  />
                </div>
                </div>
              ) ;
            })}
          </div>
        
      </div>
      <div>
        {localStorage.getItem("token") ? (
          <div className="profilePage">
            <Link to={"/"}>
              <button className="navButton" id="ProfileLogOut" onClick={logOut}>
                Log Out
              </button>
            </Link>
          </div>
        ) : (
          <div>Please log in!</div>
        )}
      </div>
    </>
  ) : (
    <div>Please log in!</div>
  );
};

export default MyRoutines;

// Guide for PATCH routine 1. create new component. 2. Create link on edit button to travel to routines/:routineId. 3. create wildcard url path for routineId. 4. fetch call within new component based on the routine id within the useParams variable. 5.

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

  const [routineData, setRoutineData] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true); // will make changes later
  const [activitiesData, setActivitiesData] = useState([]);
  const [activityId, setActivityId] = useState(0);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [updateData, setUpdateData] = useState([]);

console.log(routineData, "I am routineData")

  const createData = { name, goal, isPublic, token };

  async function handleSubmit(event) {
    event.preventDefault();
    const addPost = await createRoutines(createData);
  }

  
  
  const activityData = { activityId, count, duration, token };

  async function handleSubmit2(event) {
    event.preventDefault();
    const addActivity = await addActivityToRoutine(activityData);
  }

  useEffect(() => {
    async function getRoutineData() {
      const data = await getProfile(token);
      const username = data.username;
      const routines = await getPublicRoutinesByUser(token, username);
      setRoutineData(routines);
    }
    getRoutineData();
  }, []);

  useEffect(() => {
    async function getActivityData() {
      const allActivities = await getActivities();
      setActivitiesData(allActivities);
    }
    getActivityData();
  }, []);
  console.log(activitiesData, "howwww");

  function logOut() {
    localStorage.removeItem("token");
  }

  return token ? (
    <>
      <div>
        <h2>
          Create A Routine
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
              Would you like your routine private?
            </div>
            <input
              type="checkbox"
              name="isPublic"
              value={isPublic}
              onChange={(event) => {
                setIsPublic((event.target.value = false));
              }}
            />
            <button type="submit">Create Routine</button>
          </form>
          <div>
            {routineData.map((routine, index) => {
              return (
                <div key={index} className="tabs">
                  <h3>{routine.name}</h3>
                  <h4>{routine.creatorName}</h4>
                  <h4>{routine.goal}</h4>
                  <DetailButton routineId={routine.id} />
                  
                  <EditButton routineId={routine.id}/>

                  {
                    //add Link to EditRoutine component here and pass in necessary props to that component.
                  }
                  <button>Delete Routine</button>
                  <div>
                    <form onSubmit={handleSubmit2} id="addActivityForm">
                      <select>
                        {activitiesData.map((activity, index) => {
                          return (
                            <option key={index} value={activity.name}>
                              {activity.name}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        type="text"
                        placeholder="count"
                        name="count"
                        value={count}
                        onChange={(event) => {
                          setCount(event.target.value);
                        }}
                      ></input>
                      <input
                        type="text"
                        placeholder="duration"
                        name="duration"
                        value={duration}
                        onChange={(event) => {
                          setDuration(event.target.value);
                        }}
                      ></input>
                      <button type="submit">
                        Add Activitiy to this Routine
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </h2>
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

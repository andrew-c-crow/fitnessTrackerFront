import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createRoutines,
  getProfile,
  getPublicRoutinesByUser,
  getActivities,
} from "../api-adapter";
import { DetailButton } from "./";

const MyRoutines = (props) => {
  const token = localStorage.getItem("token");
  // console.log(token)

  const [routineData, setRoutineData] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true); // will make changes later
  const [activitiesData, setActivitiesData] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  const createData = { name, goal, isPublic, token };

  async function handleSubmit(event) {
    event.preventDefault();
    const addPost = await createRoutines(createData);
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
                  <button>Edit Routine</button>
                  <button>Delete Routine</button>
                  <form id="addActivityForm">
                    <select>
                      {activitiesData.map((activity, index) => {
                        return (
                          <option key={index} value={activity.name}>
                            {activity.name}
                          </option>
                        );
                      })}
                    </select>
                  </form>
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

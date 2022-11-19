import React, { useEffect, useState } from "react";
import {
  updateRoutine,
  addActivityToRoutine,
  getActivities,
} from "../api-adapter";
import { useParams } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const EditRoutine = (props) => {
  const { routineid } = useParams();

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [filteredRoutines, setFilteredRoutines] = useState({});

  const [activitiesData, setActivitiesData] = useState([]);
  const [activityId, setActivityId] = useState(0);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [updateData, setUpdateData] = useState([]);

  // console.log(routineid);

  useEffect(() => {
    // console.log(props.routineData)
    const filteredData = props.routineData.find((e) => {
      // console.log(e)
      if (e.id == routineid) {
        console.log("yooooohoooo");
        return true;
      }
    });
    console.log(filteredData);
    setFilteredRoutines(filteredData);
  }, [props.routineData]);

  // const [isPublic, setIsPublic] = useState(true)

  useEffect(() => {
    async function getActivityData() {
      const allActivities = await getActivities();
      setActivitiesData(allActivities);
    }
    getActivityData();
  }, []);

  // useEffect(() => {

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const editedRoutine = { name, goal, routineid, token };
    const update = await updateRoutine(editedRoutine);
  }

  async function handleSubmit2(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const activityData = {
      activityId: Number(activityId),
      count: Number(count),
      duration: Number(duration),
      routineid,
      token,
    };
    const addActivity = await addActivityToRoutine(activityData);
  }

  // console.log(filteredRoutines);
  return (
    <div key={routineid}>
      <div>
        <h1>Edit Routine</h1>
        <div>
          <div>
            <span>Current Name: </span>
            {filteredRoutines.name}
          </div>
          <div>
            <span>Current Goal: </span> {filteredRoutines.goal}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
          <label>Goal: </label>
          <input
            type="text"
            placeholder="goal"
            name="goal"
            value={goal}
            onChange={(event) => {
              setGoal(event.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <DeleteButton routineid={routineid} />
      </div>
      <form onSubmit={handleSubmit2} id="addActivityForm">
        <select
          onChange={(event) => {
            console.log(event.target.value);
            setActivityId(event.target.value);
          }}
        >
          {activitiesData.map((activity, index) => {
            // console.log(activity.name, activity.id)
            return (
              <option key={index} value={activity.id} id={activity.id}>
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
        <button type="submit">Add Activitiy to this Routine</button>
      </form>
    </div>
  );
  // :
  {
    /* <p>These are not the routines you are looking for</p>; */
  }
};

export default EditRoutine;

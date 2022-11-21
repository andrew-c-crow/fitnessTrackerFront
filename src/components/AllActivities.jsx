import React, { useEffect, useState } from "react";
import { getActivities, createActivity } from "../api-adapter";

const AllActivities = () => {
  const token = localStorage.getItem("token");

  const [activitiesData, setActivitiesData] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const activityData = { name, description, token };

  async function handleSubmit(event) {
    event.preventDefault();
    const addActivity = await createActivity(activityData);
  }

  useEffect(() => {
    async function getActivityData() {
      const allActivities = await getActivities();
      // console.log(allActivities, "allActivities")

      setActivitiesData(allActivities);
    }
    getActivityData();
  }, []);

  // Reset input fields after submit

  return token ? ( 
    <div>
      <h1 className="header">ALL PUBLIC ACTIVITIES</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="userpass"
          type="text"
          placeholder="Activity Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        ></input>
        <input
          className="userpass"
          type="text"
          placeholder="Activity Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          required
        ></input>
        <button className="loginbutton" type="submit">Create Activity</button>
      </form> 
      <div>
      {activitiesData.length ? (
          activitiesData.map((activity, index) => {
            return (
              <div key={index} className="tabs">
                <div>
                  <h3>{activity.name.toUpperCase()}</h3>
                  <h3>Description: {activity.description.toLowerCase()}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading Activities, maybe...</div>
        )}
      </div>
    </div>
  ) : 
  <div>
    <h1>I am not logged in activities</h1>
  <div>{activitiesData.length ? (
    activitiesData.map((activity, index) => {
      return (
        <div key={index} className="tabs">
          <div>
            <h3>{activity.name}</h3>
            <h3>Description: {activity.description}</h3>
          </div>
        </div>
      );
    })
  ) : (
    <div>Loading Activities, maybe...</div>
  )}</div>
  </div>;
};

export default AllActivities;

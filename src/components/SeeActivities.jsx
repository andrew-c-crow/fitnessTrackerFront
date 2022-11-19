import React from "react";
import { useParams, Link } from "react-router-dom";

const SeeActivities = (props) => {
  const { routineid } = useParams();

  
  const filteredActivities = props.routineData.filter((element) => {
    if (element.id == routineid) return true;
  });

  

  return filteredActivities ? (
    <div key={routineid}>
      <Link to="/routines">
        <button>Back</button>
      </Link>
      <h3>Selected Routine:</h3>
      <h1>{filteredActivities[0].name}</h1>
      <div>
        <h3>
          {filteredActivities[0].activities.map((activity, index) => {
            return (
              <div key={index} className="singleActivity">
                <div className="activityName">{activity.name}</div>
                <div className="activityDesc">{activity.description}</div>
                <div className="activityCount">Count: {activity.count}</div>
                <div className="activityDuration">
                  Duration: {activity.duration}
                </div>
              </div>
            );
          })}
        </h3>
      </div>
    </div>
  ) : <div>Loading Activities...</div>;
};

export default SeeActivities;

import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createRoutines, getProfile } from "../api-adapter";

const MyRoutines = (props) => {
  const token = localStorage.getItem("token");

  const [profileData, setProfileData] = useState();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true); // will make changes later

  const createData = {name, goal, isPublic}

  async function handleSubmit(event) {
    event.preventDefault();
    const addPost = await createRoutines(createData);
  }

  useEffect(() => {
    async function getProfileData() {
      let data = await getProfile(token);
      setProfileData(data);
    }
    getProfileData();
  }, []);

  function logOut() {
    localStorage.removeItem("token");
  }

  return token ? (
    <>
      <div>
        <h2>Create A Routine
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="name" name="name"
            value={name} onChange={(event) => {
              setName(event.target.value)}} required/>
            <input type="text" placeholder="goal" name="goal"
            value={goal} onChange={(event) => {
              setGoal(event.target.value)}}/>
            <div className="isPublicTitle">Would you like your routine public?</div>
            <input type="checkbox" name="isPublic"
            value={isPublic} onChange={(event) => {
              setIsPublic(event.target.value)}}/>
            <button type="submit">Create Routine</button>
          </form>
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

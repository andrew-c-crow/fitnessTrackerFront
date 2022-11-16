import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../api-adapter";

const Profile = (props) => {

    const [profileData, setProfileData] = useState();

    useEffect(() => {
        async function getProfileData() {
            const token = localStorage.getItem("token")
            let data = await getProfile(token);
            setProfileData(data);
        }
        getProfileData();
    }, []);

    function logOut() {
        localStorage.removeItem("token")
    }

    return (
        <>
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
    )
}

export default Profile
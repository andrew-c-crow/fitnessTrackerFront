const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api"

export async function registerUser(registerData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    };
    const response = await fetch(
      `${BASE_URL}/users/register`,
      options
    );
    const result = await response.json();
    console.log(result)
    return result;
  }

  export async function loginUser(loginData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        loginData
      ),
    };
    const response = await fetch(
      `${BASE_URL}/users/login`,
      options
    );
    const result = await response.json();
    return result;
  }
//   either need to: 1. get token from localStorage or 2. pass in token as argument to getProfile
  export async function getProfile(token) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
    const response = await fetch(
        `${BASE_URL}/users/me`,
        options
    );
    const result = await response.json();
    console.log(result, "!!!!")
    return result;
  }
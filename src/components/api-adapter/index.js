const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api"

export async function registerUser(username, password) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    };
    const response = await fetch(
      `${BASE_URL}/users/register`,
      options
    );
    const result = await response.json();
    console.log(result)
    return result;
  }

  export async function loginUser(username, password) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          user,
          message,
          token
        },
      }),
    };
    const response = await fetch(
      `${BASE_URL}/users/login`,
      options
    );
    const result = await response.json();
    return result;
  }

  export async function getProfile() {
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
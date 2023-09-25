const BASE_URL = `https://api.noroff.dev/api/v1/`;
const NEW_USER_URL = `/social/auth/register`;
const LOGIN_URL = `social/auth/login`;
const bearerArray = [];
const reqOptions = {
  method: "POST",
  body: JSON.stringify({
    name: "detrebukkenebruse",
    email: "bukkenebruse@stud.noroff.no",
    password: "password123",
    //avatar
    //banner
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

const newUser = async () => {
  try {
    const response = await fetch(
      "https://api.noroff.dev/api/v1/social/auth/register",
      reqOptions
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error during newUser:", error);
  }
};

const login = async (callback) => {
  try {
    const response = await fetch(
      "https://api.noroff.dev/api/v1/social/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: "bukkenebruse@stud.noroff.no",
          password: "password123",
          //avatar
          //banner
        }),
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      }
    );

    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Error during login:", error);
  }
};

/* newUser(); */
login(getTokens);

function getTokens(data) {
  const { name, email, accessToken } = data;
  bearerArray.push(accessToken);
  localStorage.setItem("Bearers", JSON.stringify(bearerArray));
  console.log(data);
}

/*Examples 
const options = {
    headers: {
    Auth: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",

    },
}
const response = await fetch (`${BASE_URL}/social/posts`, options)
const data = await response.json()








*/

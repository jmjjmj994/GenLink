export async function GET(param) {
  try {
    const res = await fetch("https://api.noroff.dev/api/v1/" + param, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });

    if (res.statusCode === 404) {
      throw new Error("Could not fetch data", error);
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {}
}

export async function likePost(param) {
  console.log(param);

  try {
    const res = await fetch("https://api.noroff.dev/api/v1/" + param, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  const data = await res.json();
return data.count
  } catch (error) {}
}







export async function changeAvatar(param, bodyData) {
    try {
      const res = await fetch("https://api.noroff.dev/api/v1/" + param, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Request failed " + res.status);
      }
    } catch (error) {
      throw error; 
    }
}





/* export async function PUT_BODY(param, bodyData) {
  try {
    const res = await fetch("https://api.noroff.dev/api/v1/" + param, {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Request failed: " + res.status);
    }
  } catch (error) {
    throw error; 
  }
}
 */
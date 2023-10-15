export async function GET(param) {
/* const BASE_URL = `https://api.noroff.dev/api/v1/`; */
  try {
      const res = await fetch("https://api.noroff.dev/api/v1/" + param, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data
    
  } catch (error) {}
}


export async function PUT_NO_BODY(param) {
  console.log(param)
  /* const BASE_URL = `https://api.noroff.dev/api/v1/`; */
  try {
    const res = await fetch("https://api.noroff.dev/api/v1/" + param, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
console.log(data)
  } catch (error) {}
}


export async function PUT_BODY(param,bodyData) {
  /* const BASE_URL = `https://api.noroff.dev/api/v1/`; */
  try {
    const res = await fetch("https://api.noroff.dev/api/v1/" + param, {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {}
}


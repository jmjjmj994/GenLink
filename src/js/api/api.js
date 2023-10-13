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


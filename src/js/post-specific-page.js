import { getSingleElements } from "./dom";

console.log("hei")


async function specificPost(id) {
    try {
      const response = await fetch(
        BASE_URL + `social/posts?`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();

      console.log(data)
    } catch (err) {
        console.error(err);
      }
    }


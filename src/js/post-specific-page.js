
import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts?`;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id)


async function specificPost(id) {
    console.log(id)
    try {
      const response = await fetch(
        BASE_URL + `social/posts/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      const specificPostContainer = getSingleElements(".post-details-container")
      specificPostContainer.innerHTML += `
      <div>
      <img src=${data.media}>
      <h1>${data.title}</h1>
      <h2>${data.body}</h2>
      </div>`
      console.log(data)
    
    } catch (err) {
        console.error(err);
      }
    }
specificPost(parseInt(id))
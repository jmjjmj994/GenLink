import { getSingleElements } from "../src/js/dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const ALL_PROFILES_URL = `social/profiles`;
const SINGLE_PROFILE_URL = `social/profiles/`;

/*   headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        }, */

// All profiles /** */

async function allEntries() {
  try {
    const response = await fetch(BASE_URL + ALL_PROFILES_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

allEntries();

console.log("hei");
// All profiles /** */

// SINGLE ENTRY //
async function singleEntry(param) {
  try {
    const response = await fetch(BASE_URL + `social/profiles/${param}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

singleEntry("Zorro");

// SINGLE ENTRY //

//all posts by profile //
async function specificPost(param) {
  try {
    const response = await fetch(BASE_URL + `social/profiles/${param}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

specificPost("Zorro");

// all posts by profile //



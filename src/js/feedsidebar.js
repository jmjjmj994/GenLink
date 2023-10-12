import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;

async function getProfiles() {
  try {
    const res = await fetch(BASE_URL + `social/profiles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });

    if (res.status === 404) {
      throw new Error(res.status);
    } else {
      const data = await res.json();
      createSidebarSuggestions(data);
    }
  } catch (error) {
    console.log("response error");
  }
}

getProfiles();
async function createSidebarSuggestions(data) {
  const sidebarContainer = getSingleElements(".feed-sidebar-users__container");
  const sidebarData = await data;
  const filterData = sidebarData.filter((data) => {
    if (data.avatar && data.name) {
      return data.avatar + data.name;
    }
  });

  filterData.forEach((user) => {
    const { name, avatar } = user;
    const sidebarWrapper = document.createElement("div");
    sidebarWrapper.className = "feed-sidebar-users__container-wrapper";
    const sidebarWrapperImage = document.createElement("img");
    sidebarWrapperImage.src = avatar;
    const sidebarWrapperButton = document.createElement("button");
    sidebarWrapperButton.className = "btn-follow";
    sidebarWrapperButton.textContent = "Follow";
    const sidebarWrapperText = document.createElement("p");
    sidebarWrapperText.textContent = name;
    sidebarWrapper.append(
      sidebarWrapperImage,
      sidebarWrapperText,
      sidebarWrapperButton
    );
    sidebarContainer.append(sidebarWrapper);
  });
  sidebarContainer.addEventListener("click", (e) => {
    console.log(e.target); //call
  });

  const feedSidebarUsersAllUsers = document.createElement("div");
  async function createSidebarUsers() {
    await data.forEach((user) => {
      const { avatar, name } = user;
      feedSidebarUsersAllUsers.className = "feed-sidebar-users__allUsers";
      const feedSidebarUsersAllUsersWrapper = document.createElement("div");
      feedSidebarUsersAllUsersWrapper.className =
        "feed-sidebar-users__allUsers-wrapper";
      const allUserImg = document.createElement("img");
      const allUsernames = document.createElement("p");
      allUsernames.textContent = name;
      if (!avatar) {
        allUserImg.src = "../blank.webp";
        feedSidebarUsersAllUsersWrapper.append(allUserImg);
      } else {
        allUserImg.src = avatar;
        feedSidebarUsersAllUsersWrapper.append(allUserImg);
      }
      feedSidebarUsersAllUsersWrapper.append(allUsernames);
      feedSidebarUsersAllUsers.append(feedSidebarUsersAllUsersWrapper);
      sidebarContainer.append(feedSidebarUsersAllUsers);
    });
  }
  createSidebarUsers();
}

export async function followUser() {
  try {
    const res = await fetch(BASE_URL + `/social/profiles/<name>/follow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
  } catch (error) {}

  followUser();
}

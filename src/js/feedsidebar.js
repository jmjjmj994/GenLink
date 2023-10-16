import { getMultipleElements, getSingleElements } from "./dom.js";
import { GET } from "./api/api.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;

const config = {
  sidebarContainer: getSingleElements(".feed-sidebar-users__container"),
  sidebarImage: getMultipleElements(
    ".feed-sidebar-users__container-wrapper img"
  ),
};

async function getProfiles() {
  try {
    const res = await GET(`social/profiles`);
    createSidebarSuggestions(res);
  } catch (error) {}
}

getProfiles();

async function createSidebarSuggestions(data) {
  const sidebarData = await data;

  const filterData = sidebarData.filter((data) => {
    if (data.avatar && data.name) {
      return data.avatar + data.name;
    }
  });

  for (const { name, avatar, id } of filterData) {
    const container = document.createElement("div");
    container.className = "feed-sidebar-users__container-wrapper";
    const image = document.createElement("img");
    image.src = avatar;
    image.alt = "user-avatar";
    const nameElement = document.createElement("p");
    nameElement.textContent = name;
    nameElement.className = "closest";
    const span = document.createElement("span");
    span.className = "sidebar-circle";
    container.appendChild(image);
    container.appendChild(nameElement);
    container.appendChild(span);
    config.sidebarContainer.appendChild(container);
    const closest = config.sidebarContainer.querySelector(".closest");
  }

  async function createSidebarUsers() {
    const feedSidebarUsersAllUsers = document.createElement("div");
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
      config.sidebarContainer.append(feedSidebarUsersAllUsers);
    });
  }
  createSidebarUsers();
}

export async function followUser(name) {
  try {
    const res = await fetch(BASE_URL + `/social/profiles/${name}/follow`, {
      method: "PUT",
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {}
}

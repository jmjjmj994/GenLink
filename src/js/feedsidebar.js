import { getMultipleElements, getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
  const sidebarContainer = getSingleElements(".feed-sidebar-users__container");

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
  const sidebarData = await data;

  const sidebarImg = getMultipleElements(".feed-sidebar-users__container-wrapper img")
 
  const filterData = sidebarData.filter((data) => {
    if (data.avatar && data.name) {
      return data.avatar + data.name;
    }
  });

<<<<<<< HEAD
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
        /*  followUser(); */
        if (e.target.classList.contains("btn-follow")) {
        console.log(e.target)
        }
   ; //call
  });
=======
>>>>>>> sidebarfunctionality



 
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
    span.className = "sidebar-circle"

    container.appendChild(image);
    container.appendChild(nameElement);
    container.appendChild(span);
    sidebarContainer.appendChild(container);
    const closest = sidebarContainer.querySelector(".closest");
       





    
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
      sidebarContainer.append(feedSidebarUsersAllUsers);
    });
  }
  createSidebarUsers();
}

<<<<<<< HEAD
export async function followUser(name) {
  try {
    const res = await fetch(BASE_URL + `/social/profiles/${name}/follow`, {
      method: "PUT",
    });
      const data = await res.json();
      console.log(data)
=======














/* export async function followUser(name) {
  console.log(name)
  try {
    const res = await fetch(BASE_URL + `social/profiles/${name}/follow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json()
    console.log(data)

>>>>>>> sidebarfunctionality
  } catch (error) {}
}


<<<<<<< HEAD
}

=======
 
export async function unFollowUser(name) {
  try {
    const res = await fetch(BASE_URL + `social/profiles/${name}/unfollow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
 console.log(data)
  } catch (error) {}
}
 */
>>>>>>> sidebarfunctionality

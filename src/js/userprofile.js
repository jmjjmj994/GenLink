import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const userData = JSON.parse(localStorage.getItem("user"));
function renderProfile() {
  const username = getSingleElements(".profile-main__user--name");
  const profileImg = getSingleElements(".profile-main__user--img");
  const user = {
    name: userData.name,
    email: userData.email,
    avatar: userData.avatar,
  };
  console.log(user.avatar);
  username.textContent = user.name;
  profileImg.src = user.avatar;
  if (!userData.avatar) {
    profileImg.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ";
  } else {
    profileImg.src = user.avatar;
  }

  showUserDetails(user.name, user.email, user.avatar);
}

function showUserDetails(name, email, avatar) {
  const btnView = getSingleElements(".btn-view");
  const userModal = getSingleElements(".show-user-wrapper");
  const userName = getSingleElements(".show-user-information__username");
  const userEmail = getSingleElements(".show-user-information__useremail");
  const profileImage = getSingleElements(".show-user-information__image");
  btnView.addEventListener("click", (e) => {
    userModal.style.visibility = "visible";
    userName.textContent = name;
    userEmail.textContent = email;
    if (!avatar) {
      profileImage.src =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ";
    } else {
      profileImage.src = avatar;
    }
  });
}

// change profile picture //

async function changeUserImage(imgUrl, username) {
  console.log(imgUrl, username);
  try {
    const res = await fetch(BASE_URL + `social/profiles/${username}/media`, {
      method: "PUT",
      body: JSON.stringify({
        avatar: imgUrl,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();

    userData.avatar = data.avatar;
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {}
}

function getCurrentUsername() {
  const profileImage = getSingleElements(
    ".change-user-img__form-current-img--image"
  );
  const image = userData.avatar;
  !image
    ? (profileImage.src =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
    : (profileImage.src = image);
  const username = userData.name;
  return username;
}
async function changeUserInput() {
  const imageForm = getSingleElements("#change-user-img__form");
  const imageInput = getSingleElements("#change-user-img__form--input-avatar");
  const submitBtn = getSingleElements(".btn-change-img");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = getCurrentUsername();
    const imageInputValue = imageInput.value.trim();
    if (!imageInputValue) {
      console.log("please enter a valid image url");
    } else {
      try {
        await changeUserImage(imageInputValue, username);
        imageInput.value = "";
        window.location.reload();
      } catch (error) {
        //error
      }
    }
  });
}

// change profile picture //

async function profilePosts(callback) {
  const username = getCurrentUsername();
  console.log(username);
  try {
    const res = await fetch(BASE_URL + `social/profiles/${username}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(res.status);
    if (res.status !== 200) {
      throw new Error(res.status, "failed");
    } else {
      const data = await res.json();
      processData(data);
    }
  } catch (error) {
    console.log(error);
  }
}

function processData(data) {
  const filterByMedia = data.filter(({ media }) => {
    if (media) return data;
  });
  dataDateNorwegian(filterByMedia);
}

function dataDateNorwegian(data) {

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const finishedData = data.map((data) => {
    
    const date = new Date(data.created);
    const newUpdatedDate = new Date(data.updated);
    const norwegianDate = date.toLocaleString("en-US", options);
    const norwegianUpdateDated = date.toLocaleString("en-US", options);
    const newData = {
      title: data.title,
      body: data.body,
      tags: [data.tags],
      media: data.media,
      created: norwegianDate,
      updated: norwegianUpdateDated,
      id: data.id,
      count: data._count,
    };
    return newData;
  });


  renderProfilePosts(finishedData)
 


      

}

function renderProfilePosts(data) {
  const profilePostsContainer = getSingleElements(".profile-main-posts");
  for (const { media, id } of data) {
    const container = document.createElement("div");
    container.className = "profile-main-posts__container"
    const link = document.createElement("a");
    link.setAttribute("href", `profileposts.html?id=${id}`)
    link.className = "profile-main-posts__container-link"
    const img = document.createElement("img");
    img.className = "profile-main-posts__container-img"
    img.src = media
    img.alt = "post image"
    container.append(img, link)
    profilePostsContainer.appendChild(container)
  }

}










//params to new site//






//params to new site//







(() => {
  changeUserInput();
  renderProfile();
  getCurrentUsername();
  profilePosts(processData);
})();

// flytt til feed og search
/* async function singleEntry(param) {
  try {
    const response = await fetch(BASE_URL + `social/profiles/${param}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
 
  } catch (error) {}
}

singleEntry("norofftest123"); */

/* 
const ALL_PROFILES_URL = `social/profiles`;
const SINGLE_PROFILE_URL = `social/profiles/`; */

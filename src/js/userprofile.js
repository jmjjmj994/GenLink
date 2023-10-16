import { getSingleElements } from "./dom.js";
import { GET, PUT_BODY } from "./api/api.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const userData = JSON.parse(localStorage.getItem("user"));
const config = {
  BASE_URL,
  username: getCurrentUsername(),
  usernameElement: getSingleElements(".profile-main__user--name"),
  profileImage: getSingleElements(".profile-main__user--img"),
  profileImageForm: getSingleElements(
    ".change-user-img__form-current-img--image"
  ),
  bannerImage: getSingleElements(".profile-main__wrapper--banner"),
  postsContainer: getSingleElements(".profile-main-posts"),
};

const inputElements = {
  newImageForm: getSingleElements(".change-user-img__form"),
  newImageInput: getSingleElements("#change-user-img__form--input-avatar"),
  submitNewImage: getSingleElements(".btn-change-img"),     
};

function getCurrentUsername() {
  const username = userData.name;
  return username;
}

function renderProfile() {
  config.usernameElement.textContent = userData.name;
  config.profileImage.src = userData.avatar;
  if (!userData.avatar) {
    config.profileImage.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ";
  } else {
    config.profileImage.src = userData.avatar;
  }

  if (!userData.banner) {
    config.bannerImage.src =
      "https://images.unsplash.com/photo-1580610447943-1bfbef5efe07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  } else {
    config.bannerImage.src = userData.banner;
  }
}

async function changeUserImage(username, imgUrl) {
  try {
    const res = await PUT_BODY(`social/profiles/${username}/media`, {
      avatar: imgUrl,
    });

    userData.avatar = res.avatar;
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {}
}

async function changeUserProfileImage() {
  const image =
    userData.avatar ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  config.profileImageForm.src = image;

  inputElements.submitNewImage.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = getCurrentUsername();
    const imageInputValue = inputElements.newImageInput.value.trim();
    if (!imageInputValue) {
      console.log("please enter a valid image url");
    } else {
      try {
        await changeUserImage(username, imageInputValue);
        inputElements.newImageInput.value = "";
        window.location.reload();
      } catch (error) {}
    }
  });
}

async function profilePosts() {
  const username = getCurrentUsername();
  try {
    const res = await GET(`social/profiles/${username}/posts`);
    processData(res);
  } catch (error) {
    console.log(error);
  }
}

function processData(data) {
  console.log(data);
  const filterByMedia = data.filter(({ media }) => {
    if (media) return data;
  });
  renderProfilePosts(filterByMedia);
}

function renderProfilePosts(data) {
  for (const { media, id } of data) {
    const container = document.createElement("div");
    container.className = "profile-main-posts__container";
    const link = document.createElement("a");
    link.setAttribute("href", `profileposts.html?id=${id}`);
    link.className = "profile-main-posts__container-link";
    const img = document.createElement("img");
    img.className = "profile-main-posts__container-img";
    img.src = media;
    img.alt = "post image";
    container.append(img, link);
    config.postsContainer.appendChild(container);
  }
}

async function editPost(id) {
  try {
    const res = await fetch(BASE_URL + `social/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: "string",
        body: "string",
        tags: ["string"],
        media:
          "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
  } catch (error) {}
}

(() => {
  changeUserProfileImage();
  renderProfile();
  getCurrentUsername();
  profilePosts();
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

/* function showUserDetails() {
  const btnView = getSingleElements(".btn-view");
  const userModal = getSingleElements(".show-user-wrapper");
  const userName = getSingleElements(".show-user-information__username");
  const userEmail = getSingleElements(".show-user-information__useremail");
  const profileImage = getSingleElements(".show-user-information__image");
  btnView.addEventListener("click", (e) => {
    userModal.style.visibility = "visible";
    userName.textContent = userData.name;
    userEmail.textContent = userData.email;
    if (!userData.avatar) {
      profileImage.src =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ";
    } else {
      profileImage.src = userData.avatar;
    }
  });
} */

// change profile picture //

import { getSingleElements } from "./dom.js";
import { GET, changeAvatar } from "./api/api.js";
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
  followCount: getSingleElements("[data-follow-stat]"),
  followersCount: getSingleElements("[data-followers-stat]"),
  postsCount: getSingleElements("[data-posts-stat]"),
};

const inputElements = {
  newImageForm: getSingleElements(".change-user-img__form"),
  newImageInput: getSingleElements("#change-user-img__form--input-avatar"),
  submitNewImage: getSingleElements(".btn-change-img"),
  newBannerInput: getSingleElements("#change-banner--input"),
  submitNewBanner: getSingleElements(".btn-banner-submit"),
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

async function userDetails() {
  try {
    const res = await GET(`social/profiles/${config.username}`);
    const posts = res._count.posts;
    const followers = res._count.followers;
    const following = res._count.following;
    config.followCount.textContent = following;
    config.postsCount.textContent = posts;
    config.followersCount.textContent = followers;
  } catch (error) {}
}
async function profilePosts() {
  try {
    const res = await GET(`social/profiles/${config.username}/posts`);
    processData(res);
  } catch (error) {
    console.log(error);
  }
}

function processData(data) {
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

async function changeUserImage(username, imgUrl) {
  try {
    const res = await changeAvatar(`social/profiles/${username}/media`, {
      avatar: imgUrl,
    });

    userData.avatar = res.avatar;
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {}
}
async function changeUserBanner(username, bannerUrl) {
  try {
    const res = await changeAvatar(`social/profiles/${username}/media`, {
      banner: bannerUrl,
    });

    userData.banner = res.banner;
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {}
}

async function handleProfileInput() {
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

async function handleBannerInput() {
  inputElements.submitNewBanner.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = getCurrentUsername();
    const bannerInputValue = inputElements.newBannerInput.value.trim();
    if (!bannerInputValue) {
      console.log("please enter a valid image url");
    } else {
      try {
        await changeUserBanner(username, bannerInputValue);
        inputElements.newBannerInput.value = "";
        window.location.reload();
      } catch (error) {}
    }
  });
}

(() => {
  userDetails();
  handleBannerInput();
  handleProfileInput();
  renderProfile();
  getCurrentUsername();
  profilePosts();
})();

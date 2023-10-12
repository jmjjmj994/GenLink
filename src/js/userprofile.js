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
    banner: userData.banner,
  };
  console.log(user.avatar);
  username.textContent = user.name;
  profileImg.src = user.banner;
  if (!userData.banner) {
    profileImg.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ";
  } else {
    profileImg.src = user.banner;
  }

  showUserDetails(user.name, user.email, user.banner);
}

function showUserDetails(name, email, banner) {
  const btnView = getSingleElements(".btn-view");
  const userModal = getSingleElements(".show-user-wrapper");
  const userName = getSingleElements(".show-user-information__username");
  const userEmail = getSingleElements(".show-user-information__useremail");
  const profileImage = getSingleElements(".show-user-information__image");
  btnView.addEventListener("click", (e) => {
    userModal.style.visibility = "visible";
    userName.textContent = name;
    userEmail.textContent = email;
    if (!banner) {
      profileImage.src =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ";
    } else {
      profileImage.src = banner;
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
        banner: imgUrl,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();

    userData.banner = data.banner;
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {}
}

function getCurrentUsername() {
  const profileImage = getSingleElements(
    ".change-user-img__form-current-img--image"
  );
  const image = userData.banner;
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
    const username = getCurrentUsername();
    e.preventDefault();

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

(() => {
  changeUserInput();
  renderProfile();
  getCurrentUsername();
})();

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
    /* console.log(data); */
  } catch (error) {}
}

singleEntry("norofftest123");

/* 
const ALL_PROFILES_URL = `social/profiles`;
const SINGLE_PROFILE_URL = `social/profiles/`; */

import { getSingleElements } from "../src/js/dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const ALL_PROFILES_URL = `social/profiles`;
const SINGLE_PROFILE_URL = `social/profiles/`;

/*  async function allEntries() {
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
 */

/* 
class Post {
  constructor() {}
  async createPost(param) {
    try {
      const res = await fetch(BASE_URL + param, {
        method: "POST",
        body: JSON.stringify({
          title: "test12ww3",
          body: "test123",
          tags: ["game", "mountain", "dancing"],
          media:
            "https://images.unsplash.com/photo-1696024344604-46b33ba2c753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  }
}

const createTest = new Post();
 createTest.createPost("hei */

/* (() => {
  async function createPost(title, body, tags, media) {
    try {
      const res = await fetch(BASE_URL + `social/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: body,
          tags: tags,
          media: media,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  }

  function input() {
    const modalFormWrapper = getSingleElements(".create-post");
    const modalForm = getSingleElements(".create-post__form");
    const titleInput = getSingleElements("#create-post__title");
    const mediaInput = getSingleElements("#create-post__image");
    const tagsInput = getSingleElements("#create-post__tags");
    const bodyInput = getSingleElements("#create-post__content");
    const submitBtn = getSingleElements(".btn-create__post");
    const mainNavbarBtn = getSingleElements("#main-navbar-btn");
    const subNavbarBtn = getSingleElements("#sub-navbar-btn");

    mainNavbarBtn.addEventListener("click", (e) => {
      if (e.currentTarget === mainNavbarBtn) {
        modalFormWrapper.classList.add("active");
        modalFormWrapper.classList.remove("hidden");
      }
    });
    subNavbarBtn.addEventListener("click", (e) => {
      if (e.currentTarget === subNavbarBtn) {
        modalFormWrapper.classList.add("active");
        modalFormWrapper.classList.remove("hidden");
      }
    });
    modalFormWrapper.addEventListener("click", (e) => {
      if (e.currentTarget === modalForm || modalForm.contains(e.target)) {
        console.log("ok"); //error
      } else if (
        e.currentTarget !== modalForm ||
        !modalForm.contains(e.target)
      ) {
        modalFormWrapper.classList.remove("active");
        modalFormWrapper.classList.add("hidden");
      }
    });

    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    submitBtn.addEventListener("click", (e) => {
      const titleInputVal = titleInput.value.trim();
      const mediaInputVal = mediaInput.value.trim();
      const tagsInputVal = tagsInput.value.trim().split(",");
      const bodyInputVal = bodyInput.value.trim();

      if (titleInputVal.length > 0) {
        createPost(titleInputVal, bodyInputVal, tagsInputVal, mediaInputVal);
        titleInput.value = "";
        mediaInput.value = "";
        tagsInput.value = "";
        bodyInput.value = "";
        modalFormWrapper.classList.remove("active");
        modalFormWrapper.classList.add("hidden");
      } else {
        console.log("please fill in title");
      }
    });
  }

  input();
})();

function renderProfile() {
  const username = getSingleElements(".profile-main__user--name");
  const profileImg = getSingleElements(".profile-main__user--img");
  const profileData = JSON.parse(localStorage.getItem("user"));
  console.log(profileData);
  const user = {
    name: profileData.name,
    email: profileData.email,
    avatar: profileData.avatar,
    banner: profileData.banner,
  };

  username.textContent = user.name;
  !user.avatar
    ? (profileImg.src =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ")
    : (profileImg.src = user.avatar);

  showUserDetails(user.name, user.email, user.avatar);
}
renderProfile();

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
    !avatar
      ? (profileImage.src =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png ")
      : (profileImage.src = avatar);
    const data = JSON.parse(localStorage.getItem("user"));
  });
} */

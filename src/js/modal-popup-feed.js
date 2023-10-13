import { getSingleElements } from "./dom.js";

const BASE_URL = `https://api.noroff.dev/api/v1/`;

async function createPost(title, body, tags, media) {
  console.log(title, body, tags, media);
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

function handleNavbarClick() {
  const mainNavbarBtn = getSingleElements("#main-navbar-btn");
  const subNavbarBtn = getSingleElements("#sub-navbar-btn");
  const subNavbar = getSingleElements(".sub-navbar");
  
  const modalFormWrapper = getSingleElements(".create-post-wrapper");
  const modalForm = getSingleElements(".create-post__form");

  mainNavbarBtn.onclick = () => showPostModal();
  subNavbarBtn.onclick = () => showPostModal();

  function showPostModal() {
    modalFormWrapper.classList.add("active");
    modalFormWrapper.classList.remove("hidden");
  }


  function hideModals() {
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


  }
  hideModals();
}

function handleInput() {
  const modalFormWrapper = getSingleElements(".create-post-wrapper");
  const titleInput = getSingleElements("#create-post__title");
  const mediaInput = getSingleElements("#create-post__image");
  const tagsInput = getSingleElements("#create-post__tags");
  const bodyInput = getSingleElements("#create-post__content");
  const submitBtn = getSingleElements(".btn-create__post");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
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










(() => {
  /*   logOut() */
  handleNavbarClick();
  handleInput();
})();








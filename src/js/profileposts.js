import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//create post modal
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

handleNavbarClick();
handleInput();

//create post modal

//single post
async function getPost() {
  try {
    const res = await fetch(BASE_URL + `social/posts/${parseInt(id)}`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    renderPost(data);
    editPost(data)
  } catch (error) {}
}

getPost();

async function renderPost(data) {
  console.log(data);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const date = new Date(data.created);
  const newUpdatedDate = new Date(data.updated);
  const norwegianDate = date.toLocaleString("en-US", options);
  const imageContainer = getSingleElements(".profile-posts-main__image");
  const contentContainer = getSingleElements(".profile-posts-main__content");
  const contentContainerHeader = getSingleElements(
    ".profile-posts-main__content-header"
  );
  const contentContainerBody = getSingleElements(
    ".profile-posts-main__content-body"
  );
  const contentContainerFooter = getSingleElements(
    ".profile-posts-main__content-footer"
  );
  try {
    const postData = await data;
    const norwegianUpdateDated = date.toLocaleString("en-US", options);

    const image = document.createElement("img");
    image.className = "profile-posts-main__image--img";
    image.src = postData.media;
    image.alt = "Post image";
    imageContainer.append(image);
    const header = document.createElement("h1");
    header.textContent = postData.title;
    const subheader = document.createElement("p");
    subheader.textContent = norwegianUpdateDated;
    contentContainerHeader.append(header, subheader);
    const bodyText = document.createElement("p");
    bodyText.textContent = postData.body;
    contentContainerBody.append(bodyText);
    const tags = postData.tags.map((tag) => {
      const postTags = document.createElement("p");
      postTags.textContent = tag;
      return postTags;
    });
    tags.forEach((tag) => {
      contentContainerFooter.append(tag);
    });


  } catch (error) {}
}

async function editPost(data) {
  try {
    const currentData = await data;
    const editPostBtn = document.querySelector("#edit-postBtn");
    const editModal = document.querySelector("#editModal");
    const closeModal = document.querySelector(".close");
    const saveChangesBtn = document.querySelector("#saveChanges");
    const postTitleInput = document.querySelector("#post-title");
    const postContentTextarea = document.querySelector("#post-content");
    const newPostTags = document.querySelector("#post-tags");
    const header = document.createElement("h1");
    const bodyText = document.createElement("p");
    const contentContainerFooter = getSingleElements(".profile-posts-main__content-footer");

    closeModal.addEventListener("click", () =>{
      editModal.style.display = "none";
    })

    editPostBtn.addEventListener("click", () => {
      editModal.style.display = "block";

      // Populate input fields with current post data for editing
      postTitleInput.value = currentData.title;
      postContentTextarea.value = currentData.body;
      newPostTags.value = currentData.tags.join(",");
    });

    saveChangesBtn.addEventListener("click", async () => {
      const newTitle = postTitleInput.value;
      const newContent = postContentTextarea.value;
      const newTags = newPostTags.value.split(",");

      // Update the post data with the new values
      currentData.title = newTitle;
      currentData.body = newContent;
      currentData.tags = newTags;

      // You can now update the post content on the page
      header.textContent = newTitle;
      bodyText.textContent = newContent;
      contentContainerFooter.innerHTML = "";

      // Create and append new tag elements
      newTags.forEach((tag) => {
        const editedPostTags = document.createElement("p");
        editedPostTags.textContent = tag;
        contentContainerFooter.append(editedPostTags);
      });


      // Send the updated data to the server
      const updateData = {
        title: newTitle,
        body: newContent,
        tags: newTags,
      };

      try {
        const response = await fetch(BASE_URL + `social/posts/${parseInt(id)}`, {
          method: "PUT", // Use 'PUT' or 'POST' based on your server implementation
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(updateData),
        });
        

        if (response.ok) {
          console.log("post updated")
        } else {
          console.log("post didnt get the update")
          console.log(response)

        }
      } catch (error) {
        console.error(error);
      }

      // Close the modal
      editModal.style.display = "none";
    });
  } catch (error) {}
}



//single post






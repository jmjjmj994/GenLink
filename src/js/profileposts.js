import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

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
    const editPostBtn = getSingleElements("#edit-postBtn");
    const editModal = getSingleElements("#edit-modal");
    const closeModal = getSingleElements(".close");
    const saveChangesBtn = getSingleElements("#saveChanges");
    const postTitleInput = getSingleElements("#post-title");
    const postContentTextarea = getSingleElements("#post-content");
    const newPostTags = getSingleElements("#post-tags");
    const header = document.createElement("h1");
    const bodyText = document.createElement("p");
    const contentContainerFooter = getSingleElements(".profile-posts-main__content-footer");

    closeModal.addEventListener("click", () =>{
      editModal.style.display = "none";
    })

    editPostBtn.addEventListener("click", () => {
      editModal.style.display = "block";

      postTitleInput.value = currentData.title;
      postContentTextarea.value = currentData.body;
      newPostTags.value = currentData.tags.join(",");
    });

    saveChangesBtn.addEventListener("click", async () => {
      const newTitle = postTitleInput.value;
      const newContent = postContentTextarea.value;
      const newTags = newPostTags.value.split(",");

      currentData.title = newTitle;
      currentData.body = newContent;
      currentData.tags = newTags;

      header.textContent = newTitle;
      bodyText.textContent = newContent;
      contentContainerFooter.innerHTML = "";

      newTags.forEach((tag) => {
        const editedPostTags = document.createElement("p");
        editedPostTags.textContent = tag;
        contentContainerFooter.append(editedPostTags);
      });

      const updateData = {
        title: newTitle,
        body: newContent,
        tags: newTags,
      };

      try {
        const response = await fetch(BASE_URL + `social/posts/${parseInt(id)}`, {
          method: "PUT", 
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
      editModal.style.display = "none";
    });
  } catch (error) {}
}

//delete post 

 function displayDeleteModal() {

    const deletePostBtn = getSingleElements("#delete-postBtn");
    const deleteModal = getSingleElements(".delete-post-modal");
    const closeDeleteModal = getSingleElements(".close-delete-modal");
    const confirmDelete = getSingleElements("#deletePost")

    closeDeleteModal.addEventListener("click", () =>{
      deleteModal.style.display = "none";
    })
    deletePostBtn.addEventListener("click", () => {
      deleteModal.style.display = "block";
  })

  confirmDelete.addEventListener("click",() =>{
    deletePost(id)
  } )
  deleteModal.style.display = "none";
}

displayDeleteModal()

async function deletePost(id) {
  try {
  const response = await fetch(BASE_URL + `social/posts/${id}`, {
    method: "DELETE", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json; charset=UTF-8",
    },
  });
  if(response.status === 404){
    window.location.href = "profile.html"
  }

  }
  catch (error) {}
}

deletePost()
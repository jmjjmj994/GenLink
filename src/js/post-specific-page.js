import { getSingleElements } from "./dom.js";

const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts?`;

function initialize() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  console.log(id);

  specificPost(id);
}

async function specificPost(id) {
  try {
    const data = await fetchPostData(id);

    const specificPostContainer = getSingleElements(".post-details-container");
    specificPostContainer.innerHTML = buildPostHTML(data);

    const commentSection = data.comments.map((comment) => ({
      title: comment.body,
      user: comment.owner,
    }));

    const postCommentSection = getSingleElements("#comment-section");
    postCommentSection.innerHTML = buildCommentSectionHTML(commentSection);

    const commentForm = getSingleElements("#comment-form");
    const commentInput = getSingleElements("#new-comment");

    commentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const userComment = commentInput.value;
      await createNewComment(id, userComment);
      specificPost(id);
      
    });
  } catch (err) {
    console.error(err.status);
  }
}

async function fetchPostData(id) {
  const response = await fetch(
    BASE_URL + `social/posts/${id}?_comments=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.json();
}

function buildPostHTML(data) {
  return `
    <div class="post-details-container">
      <img  src="${data.media}">
      <h1>${data.title}</h1>
      <h2>${data.body}</h2>
      <div class="post-reations">
        <div class="post-likes">👍${data._count.reactions}</div>
        <div class="post-comments"><i class="fa-regular fa-comment"></i>${data._count.comments}</div>
        
        <form id="comment-form">
          <label for="new-comment">Post a comment</label>
          <input type="text" id="new-comment" name="new-comment">
          <button class="new-comment-button" type="submit">Submit</button>
        </form>

        <div class="comment-section" id="comment-section"></div>
      </div>
    </div>
  `;
}

function buildCommentSectionHTML(commentSection) {
  return commentSection
    .map((comment) => `
      <div class="comment-container">
        <p class="comment-user-name">${comment.user}</p>
        <p class="comment-content">${comment.title}</p>
      </div>
    `)
    .join("");
}

async function createNewComment(id, comment) {
  try {
    const response = await fetch(
      BASE_URL + `social/posts/${id}/comment`,
      {
        method: "POST",
        body: JSON.stringify({ body: comment }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    console.log(response);
  } catch (err) {
    const errorResponse = await response.text();
    console.error("Error posting comment:", errorResponse);
  }
}

initialize();


import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts?`;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id)


async function specificPost(id) {
    console.log(id)
    
    try {
      const response = await fetch(
        
        BASE_URL + `social/posts/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      const specificPostContainer = getSingleElements(".post-details-container")
      specificPostContainer.innerHTML += `
      <div class ="post-details-container">
      <img src=${data.media}>
      <h1>${data.title}</h1>
      <h2>${data.body}</h2>
      <div class ="post-reations">
      <div class ="post-likes">👍${data._count.reactions}</div>
      <div class ="post-comments"><i class="fa-regular fa-comment"></i>${data._count.comments}</div>
      
    
      <form id="comment-form">
      <label for="new-comment">Post a comment</label>
      <input type="text" id="new-comment" name="new-comment">
      <button class="new-comment-button" type="submit">Submit</button>
      </form>

      </div>`
      const commentInput = getSingleElements("#new-comment");

      const commentForm = getSingleElements(".new-comment-button");
              commentForm.addEventListener("click", async (event) => {
              event.preventDefault();
              const userComment = commentInput.value.trim();

              createNewComment(userComment);
  
              commentInput.value = '';
          });


      console.log(data)
    
    } catch (err) {
        console.error(err);
      }
      
    }
    async function createNewComment(comment) {
      console.log(comment)
      console.log(id)
      try {
          const response = await fetch(
            BASE_URL + `social/posts/${id}/comment`,
              {
                method: "POST",
                body: JSON.stringify({comment: comment}),
                   headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      "content-type": "application/json; charset=UTF-8",
                  }, 

              }
          );
              console.log(response)


      } catch (err) {
        const errorResponse = await response.text();
        console.error("Error posting comment:", errorResponse);

      }
  }
  specificPost(parseInt(id));

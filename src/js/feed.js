import { getSingleElements } from "./dom.js";
import { GET } from "./api/api.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts`;
const container = getSingleElements(".feed-main__posts");

const allPosts = await GET("social/posts?_author=true");
function createHTML() {
  const filterPosts = allPosts.filter((post) => {
    const postAuthor = post;

    if (postAuthor) return post.title.length > 4;
  });

  container.innerHTML = filterPosts
    .map((post) => {
      const { id, title, body, tags, media, created, updated, author } = post;
      const authorName = author.name;
      let authorAvatar = author.avatar;

      if (media) {
        return `
<div class="feed-main__posts-card">
<div class="feed-main__posts-card__header">
<img  class="feed-main__posts-card--header--img" src="${media}" />
</div>
<div class="feed-main__posts-card__body">
<p class="feed-main__posts-card--body-author"> Author: ${authorName} </p>
<p class="feed-main__posts-card--body-title" >${title} </p>
<p class="feed-main__posts-card--body-text"> ${body}</p>
</div>
<div class="feed-main__posts-card__footer">
<div class="feed-main__posts-card-footer-links">
<a   href="otherprofile.html?name=${authorName},"> View Profile </a>
<a href="post-specific-page.html?${id}">View Post</a>
</div>
<div class="feed-main__posts-card-footer-tags">

<p> ${tags}</p>

</div>
</div>
    </div> 
    `;
      }
    })
    .join("");
}

createHTML();

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
      /*       console.log(data);
       */
    } catch (error) {}
  }
}

const createTest = new Post();
/* createTest.createPost()*/

//filter Search bar

async function userSearchInput(id) {
  try {
    const response = await fetch(BASE_URL + `social/posts?`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    const parsedId = parseInt(id);

    const output = getSingleElements(".list-output");
    const inputBox = getSingleElements("#search-posts");

    inputBox.addEventListener("input", () => {
      const input = inputBox.value.trim().toLowerCase();

      const result = data.filter((post) => {
        return post.id.toString().toLowerCase().includes(input);
      });

      if (result.length > 0) {
        const list = result.map((post) => {
          return `<li class="list-item"><a href="/src/post-specific-page.html?id=${post.id}">${post.id}</a></li>`;
        });
        output.innerHTML = `<ul class="list-item">${list.join("")}</ul>`;
      } else {
        output.innerHTML = "No matching posts found.";
      }
    });
  } catch (err) {
    console.error(err);
  }
}

const userSearch = getSingleElements("#search-posts");
userSearch.addEventListener("input", (e) => {
  const userSearchValue = userSearch.value;
  userSearchInput(userSearchValue);
});

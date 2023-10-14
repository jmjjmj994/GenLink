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
      const { id, title, body, tags, media, created, updated, author, _count } = post;
      const authorName = author.name;
      const reactions = _count.reactions;
      console.log(reactions)
      let authorAvatar = author.avatar;

      if (media) {
        return `
<div class="feed-main__posts-card">
<div class="feed-main__posts-card__avatar">
<a  href="otherprofile.html?name=${authorName},"> <img src="${media}" /> 
</a>
<p> ${authorName}</p>
</div>
<div class="feed-main__posts-card__header">
<img  class="feed-main__posts-card--header--img" src="${media}" />
</div>
<div class="feed-main__posts-card__body">
<div class="feed-main__posts-card__body-content">
<p class="feed-main__posts-card--body-content--title" >${title} </p>
<p class="feed-main__posts-card--body-content--text"> ${body}</p>

</div>
<div class="feed-main__posts-card--body-reactions">
<button class="btn btn-react">👍</button><span class="reactions">${reactions} </span>
<button class="btn btn-comment"><i class="fa-regular fa-comment"></i> </button> 
</div>
</div>
<div class="feed-main__posts-card__footer">
<div class="feed-main__posts-card-footer-links">
<a class="feed-main__posts-card-footer-links--href" href="post-specific-page.html?${id}">View Post</a>
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

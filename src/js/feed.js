import { getSingleElements, getMultipleElements } from "./dom.js";
import { GET, likePost } from "./api/api.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts`;
const container = getSingleElements(".feed-main__posts");

const allPosts = await GET("social/posts?_author=true");


async function createHTML() {
 
  try {
    const filterPosts = allPosts.filter((post) => {
      const postAuthor = post;
      if (postAuthor) return post.title.length > 4;
    });

    container.innerHTML = filterPosts
      .map((post) => {
        const {
          id,
          title,
          body,
          tags,
          media,
          created,
          updated,
          author,
          _count,
        } = post;
        const authorName = author.name;
        const reactions = _count.reactions;

        let authorAvatar = author.avatar;

        if (media) {
          return `
<div class="feed-main__posts-card">
<div class="feed-main__posts-card__avatar">
<a  href="./otherprofile.html?name=${authorName}"> <img src="${media}" /> 
</a>
<span> ${authorName}</span>
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
<button class="btn btn-react" post-id="${id}">👍</button><span class="reactions">${reactions} </span>
<button class="btn btn-comment"><i class="fa-regular fa-comment"></i> </button> 
</div>
</div>
<div class="feed-main__posts-card__footer">
<div class="feed-main__posts-card-footer-links">
<a class="feed-main__posts-card-footer-links--href" href="post-specific-page.html?id=${id}">View Post</a>
</div>
<div class="feed-main__posts-card-footer-tags">
<p> ${tags}</p>
</div>
</div>
    </div> `;
        }
      })
      .join("");
    const buttons = document.querySelectorAll(".btn-react");
    buttons.forEach((button) => {
      const cardId = button.getAttribute("post-id");
      const isDisabled = localStorage.getItem(`btn-disabled-${cardId}`);
      if (isDisabled === "true") {
        button.disabled = true;
      }
    });
  } catch (error) {}

  container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-react")) {
      const cardId = e.target.getAttribute("post-id");
      const button = e.target;
      if (!button.disabled) {
        const updatedLikeCount = await likePost(
          `social/posts/${parseInt(cardId)}/react/👍`
        );

        if (updatedLikeCount !== undefined) {
          const cardButton = button.closest(".feed-main__posts-card");
          const reactionCount = cardButton.querySelector(".reactions");
          if (reactionCount) {
            reactionCount.textContent = updatedLikeCount;
          }
        }

        button.disabled = true;
        localStorage.setItem(`btn-disabled-${cardId}`, "true");
      }
    } else {
      console.log("not found");
    }
  });
}
createHTML();

//create filterdHTML


const tagSearch = getSingleElements("#filter-tags");
tagSearch.addEventListener("input", (e) => {
  const searchTag = tagSearch.value.trim().toLowerCase();
  createFilterHTML(searchTag);
});

async function createFilterHTML(filterTag) {
  try {
    // Filter posts based on whether they contain the filterTag
    const filteredPosts = allPosts.filter((post) => {
      return post.tags.some((tag) => tag.toLowerCase().includes(filterTag));
    });

    container.innerHTML = "";

    filteredPosts.forEach((post) => {
      const {
        id,
        title,
        body,
        tags,
        media,
        created,
        updated,
        author,
        _count,
      } = post;
      const authorName = author.name;
      const reactions = _count.reactions;

      let authorAvatar = author.avatar;

      if (media) {
        const postHTML =  `
        <div class="feed-main__posts-card">
        <div class="feed-main__posts-card__avatar">
        <a  href="otherprofile.html?name=${authorName}"> <img src="${media}" /> 
        </a>
        <span> ${authorName}</span>
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
        <button class="btn btn-react" post-id="${id}">👍</button><span class="reactions">${reactions} </span>
        <button class="btn btn-comment"><i class="fa-regular fa-comment"></i> </button> 
        </div>
        </div>
        <div class="feed-main__posts-card__footer">
        <div class="feed-main__posts-card-footer-links">
        <a class="feed-main__posts-card-footer-links--href" href="post-specific-page.html?id=${id}">View Post</a>
        </div>
        <div class="feed-main__posts-card-footer-tags">
        <p> ${tags}</p>
        </div>
        </div>
            </div> `;
        container.innerHTML += postHTML;
      }
    });

    const buttons = document.querySelectorAll(".btn-react");
    buttons.forEach((button) => {
      const cardId = button.getAttribute("post-id");
      const isDisabled = localStorage.getItem(`btn-disabled-${cardId}`);
      if (isDisabled === "true") {
        button.disabled = true;
      }
    });
  } catch (error) {
    console.error(error);
  }

  container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-react")) {
      const cardId = e.target.getAttribute("post-id");
      const button = e.target;
      if (!button.disabled) {
        const updatedLikeCount = await likePost(
          `social/posts/${parseInt(cardId)}/react/👍`
        );

        if (updatedLikeCount !== undefined) {
          const cardButton = button.closest(".feed-main__posts-card");
          const reactionCount = cardButton.querySelector(".reactions");
          if (reactionCount) {
            reactionCount.textContent = updatedLikeCount;
          }
        }

        button.disabled = true;
        localStorage.setItem(`btn-disabled-${cardId}`, "true");
      }
    } else {
      console.log("not found");
    }
  });
}

//check state of btn

//

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-react");
  buttons.forEach((button) => {
    const cardId = button.getAttribute("post-id");
    const isDisabled = localStorage.getItem(`btn-disabled-${cardId}`);

    if (isDisabled === "true") {
      button.disabled = true;
    }
  });
});

//filter Search bar
async function userSearchInput(name, avatar) {
  try {
    const response = await fetch(BASE_URL + `social/profiles?`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();

    const output = getSingleElements(".list-output");
    const inputBox = getSingleElements("#search-users");

    inputBox.addEventListener("input", (e) => {
      const input = inputBox.value.trim().toLowerCase()
      if (input === "" ){
        output.style.display = "none";
      }else{
        output.style.display = "block";
      }


      const result = data.filter((post) => {
        return post.name.toLowerCase().includes(input);
      });

      if (result.length > 0) {
        const list = result.map((post) => {
          if (post.avatar) {
            return `<li class="list-item"><div class="search-bar-container"><a href="otherprofile.html?name=${post.name}"><img class="search-bar-img" src ="${post.avatar}">${post.name}</a></div></li>`;
          } else {
            return `<li class="list-item"><div class="search-bar-container"><a href="otherprofile.html?name=${post.name}"><img class="search-bar-img" src ="../blank.webp">${post.name}</a></div></li>`;
          }
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

const userSearch = getSingleElements("#search-users");
userSearch.addEventListener("input", (e) => {
  const userSearchValue = userSearch.value;
  userSearchInput(userSearchValue);
});

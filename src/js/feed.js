import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts?`;
const container = getSingleElements(".feed-main__posts");
async function getAllPosts(limit, offset) {
  console.log(offset);
  try {
    const response = await fetch(
      BASE_URL + `social/posts?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    data.forEach(({ title, body, media, id, tags }) => {
      container.append(createHTML(title, body, media, id, tags));
    });
  } catch (err) {
    console.error(err);
  }
}

function createHTML(title, body, media, id, tags) {
  const card = document.createElement("div");
  card.className = "feed-main__posts-card";
  card.setAttribute("id", id);
  const cardHeader = document.createElement("div");
  cardHeader.className = "feed-main__posts-card__header";
  const cardBody = document.createElement("div");
  cardBody.className = "feed-main__posts-card__body";
  const cardFooter = document.createElement("div");
  const profileLink = document.createElement("a")
  const postLink = document.createElement("a")
  profileLink.textContent = "Profile"
  postLink.textContent = "Post"
  profileLink.setAttribute("href", `otherprofile.html?id=${id}`)
  postLink.setAttribute("href", `post-specific-page.html?id=${id}`)
  



  cardFooter.className = "feed-main__posts-card__footer";
  if (media) {
    const feedHeaderImage = document.createElement("img");
    feedHeaderImage.className = "feed-main__posts-card--header--img";
    feedHeaderImage.src = media;
    feedHeaderImage.alt = "image";
    cardHeader.appendChild(feedHeaderImage);
  }

  const feedBodyTitle = document.createElement("p");
  feedBodyTitle.className = "feed-main__posts-card--body--title";
  feedBodyTitle.textContent = title;
  const feedBodyContent = document.createElement("p");
  feedBodyContent.className = "feed-main__posts-card--body--text";
  feedBodyContent.textContent = body;
  const feedTagsContent = document.createElement("p");
  feedTagsContent.className = "feed-main__posts-card--body--tags";
  feedTagsContent.textContent = tags;
  cardBody.append(feedBodyTitle, feedBodyContent);
  cardFooter.append(profileLink, postLink, feedTagsContent);
  card.append(cardHeader, cardBody, cardFooter);
  return card;
}

function observe(trigger) {
  let limit = 4;
  let offset = 0;
  const load = 4;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (offset < 16) {
          getAllPosts(limit, offset);
          offset += limit;

/*           console.log(limit, load, offset);
 */        } else {
          console.log("done");
        }
      }
    });
  });

  observer.observe(trigger);
}

observe(getSingleElements(".observer-trigger"));

//create posts

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
 */    } catch (error) {}
  }
}

const createTest = new Post();
/* createTest.createPost()*/

//filter Search bar

async function userSearchInput(id) {
  try {
    const response = await fetch(
      BASE_URL + `social/posts?`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      }
    );
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
        output.innerHTML = `<ul class="list-item">${list.join('')}</ul>`;
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




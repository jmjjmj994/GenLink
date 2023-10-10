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
  cardFooter.append(feedTagsContent);
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

          console.log(limit, load, offset);
        } else {
          console.log("done");
        }
      }
    });
  });

  observer.observe(trigger);
}

observe(getSingleElements(".observer-trigger"));

//create posts

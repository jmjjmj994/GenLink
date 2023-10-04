import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts`;

class AllPosts {
  constructor(postFeedEl) {
    this.postFeedEl = postFeedEl;
  }

  async allPostsEntries() {
    try {
      const res = await fetch(BASE_URL + POST_PARAM, {
        method:"GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      /*   credentials:"include", */
      });

      const data = await res.json();

      return data;
    } catch (error) {}
  }

  async handleEntries() {
    try {
      const data = await this.allPostsEntries();

      const postLimit = 15; //adjust?
      const limitResult = data.slice(0)
      const dataWithMedia = limitResult.filter(entry => entry.media)
      dataWithMedia.forEach(entry => {
        const { title, body, id, tags, media } = entry;
        
 this.createFeedEl(title, body, id, tags, media);
      })

    } catch (error) {}
  }

  createFeedEl(title, body, id, tags, media) {
   


    this.postFeedEl.innerHTML += 

    
    
    


  /* 
    const card = document.createElement("div");
    card.className = "feed-main__posts-card";
    card.setAttribute("id", id);
 

    const cardHeader = document.createElement("div");
    cardHeader.className = "feed-main__posts-card__header";
    const cardBody = document.createElement("div");
    cardBody.className = "feed-main__posts-card__body";
    const cardFooter = document.createElement("div");
    cardFooter.className = "feed-main__posts-card__footer";

 
    const feedHeader = document.createElement("p");
    feedHeader.className = "feed-main__posts-card--header--title";
    feedHeader.textContent = title;
    const feedBodyContent = document.createElement("p");
    feedBodyContent.className = "feed-main__posts-card--body--text";
    feedBodyContent.textContent = body;

    if (media) {

      console.log(media)

    
           const feedBodyImage = document.createElement("img");
           feedBodyImage.src = media;  cardBody.appendChild(feedBodyImage);

    }


    const feedTagsContent = document.createElement("p");
    feedTagsContent.className = "feed-main__posts-card--body--tags";
    feedTagsContent.textContent = tags;


    cardHeader.append(feedHeader);
    cardBody.append(feedBodyContent);
    cardFooter.append(feedTagsContent);

    card.append(cardHeader, cardBody, cardFooter);
    this.postFeedEl.append(card); */
  }

  async init() {
    try {
      await this.handleEntries();
    } catch (error) {}
  } 
}

const test = new AllPosts(getSingleElements(".feed-main__posts"));
 test.allPostsEntries(); 
test.init()






//create posts

class Post {
  constructor() {}

  async createPost(param) {
    try {
      const res = await fetch(BASE_URL + param, {
        method: "POST",
        body: JSON.stringify({
          title: "Todays Dinner",
          body: "lorem ipsum",
          tags: ["life", "food", "dogs"],
          media:
            "https://unsplash.com/photos/a-close-up-of-a-green-plant-with-leaves-2eU1r1ANyRE",
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
}

/* const createTest = new Post(); */
/*  createTest.createPost("social/posts")   */

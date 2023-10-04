import { getSingleElements } from "./dom.js";
/* 
Properties

{
id{integer} - identifier for post
title {string} title of post
body {body} of post
tags{a string of array tags}
media {a url to an image/video}
created {date of post creation}
updated {date of post updated}
_count {JSON object containing the number of comments and reactions
}


Params
_author {true} if set to true, the comments of the post will be include in the response
_comments {true} --..--
_reactions{true} --..--   
*/



const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts`;

class AllPosts {
  constructor() {}

  async getPosts() {
    try {
      const res = await fetch(BASE_URL + POST_PARAM, {
        method: "POST",
        body: JSON.stringify({
          title: "string",
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

const test = new AllPosts();
test.getPosts();

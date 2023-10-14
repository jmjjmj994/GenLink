const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const username = params.get("name");
const BASE_URL = `https://api.noroff.dev/api/v1/`;

async function getUserData(name, callback) {
  try {
    const res = await fetch(BASE_URL + `social/profiles/${name}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    const username = data.name;
    const avatar = data.avatar;
    const followers = data._count.followers
    const following = data._count.following
    const posts = data._count.posts

   callback(username, avatar, followers, following, posts)
   
  } catch (error) {
 
  }
}

getUserData(username, renderHTML);


function renderHTML(name, avatar, followers, following, posts){
const userImg = document.querySelector(".profile-main__user--img")
userImg.src = avatar
const username = document.querySelector(".profile-main__user--name")
username.textContent = name
const userFollowers = document.querySelector(".followers-count")
const userFollowing = document.querySelector(".follow-count")

const userPosts = document.querySelector(".posts-count")

if(followers > 0) {
    userFollowers.textContent = followers
} else {
    userFollowers.textContent = 0
}
if(following > 0){
    userFollowing.textContent = following
} else {
    userFollowing.textContent = 0
}
if(posts > 0) {
    userPosts.textContent = posts
} else {
    userPosts.textContent = 0
}




console.log(userFollowers, userFollowing, userPosts)

}

/*
avatar
: 
null
banner
: 
null
email
: 
"tina.testuser@noroff.no"
name
: 
"tina"


*/
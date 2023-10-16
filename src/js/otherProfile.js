const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const username = params.get("name");

const BASE_URL = `https://api.noroff.dev/api/v1/`;

let GlobalFollowers = []

let followApiEndpoint = BASE_URL + `social/profiles/${username}/`

const myUsername = JSON.parse(localStorage.getItem("user")).name


async function getUserData(name, callback) {

  console.log(callback, "callback")

  try {

    const res = await fetch(BASE_URL + `social/profiles/${username}?_followers=true`, {

      method: "GET",

      headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`,

        "content-type": "application/json; charset=UTF-8",

      },

    });

    const data = await res.json();


    const fetchedName = data.name; 

    const avatar = data.avatar;

    const followersCount = data._count.followers;

    const following = data._count.following;

    const posts = data._count.posts;

    const followers = data.followers

    GlobalFollowers = followers

    callback(fetchedName, avatar, followersCount, following, posts, followers); 

    console.log(data, "getuserprofile")

  } catch (error) {

    console.error("Error fetching user data:", error);

  }
}

getUserData(username, renderHTML);

function renderHTML(name, avatar, followersCount, following, posts) {

  const userImg = document.querySelector(".profile-main__user--img");
  const usernameElement = document.querySelector(".profile-main__user--name");
  const userFollowers = document.querySelector(".followers-count");
  const userFollowing = document.querySelector(".follow-count");
  const userPosts = document.querySelector(".posts-count");

  usernameElement.textContent = name;
  userFollowers.textContent = followersCount;
  userFollowing.textContent = following;
  userPosts.textContent = posts;
  userImg.src = avatar;
  followApiEndpoint = BASE_URL + `social/profiles/${username}/`

  const isFollower = GlobalFollowers.some(profile => profile.name === myUsername)

 if (isFollower) {
  followBtn.innerText = "Unfollow"
  followApiEndpoint += "unfollow"
 } else {
  followBtn.innerText = "Follow"
  followApiEndpoint += "follow"
 }
}

async function LetFollow(username) {

  try {

    const res = await fetch(BASE_URL + `social/profiles/${username}?_followers=true`, {

      method: "PUT",
      headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`,

      },

    });

    console.log(res, "response")

  }

catch (error) {

  console.log(error, "THIS IS AN ERROR")

}
}


const followBtn = document.querySelector(".btn-follow");
followBtn.addEventListener("click",()=>{
  followToggle()
})

async function followToggle() {
  console.log(myUsername, "myUserName")
  console.log(GlobalFollowers, "GlobalFollowers")

  try {
    const res = await fetch(followApiEndpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
       
      },
    });
  console.log(res)
getUserData(username, renderHTML)
  } catch (error) {}


}


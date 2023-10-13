




const followButton = document.querySelector('.btn-follow');
const followerCountElement = document.querySelector('[data-followers-stat]');

let followerCount = parseInt(followerCountElement.textContent);
let isFollowing = false;

function handleFollowButtonClick() {
  if (isFollowing) {
   
    followerCount--;
  } else {
  
    followerCount++;
  }

  localStorage.setItem('followerCount', followerCount);
  localStorage.setItem('isFollowing', isFollowing);

  isFollowing = !isFollowing;

  
  followerCountElement.textContent = followerCount;

  followButton.textContent = isFollowing ? 'Following' : 'Follow';
}

followButton.addEventListener('click', handleFollowButtonClick);









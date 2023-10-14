const followButton = document.querySelector('.btn-follow');
const followerCountElement = document.querySelector('[data-followers-stat]');

// Assuming you have a way to obtain the user's unique ID, replace 'USER_ID' with the actual user ID.
const userId = 'USER_ID';

// Load follower count and follow status specific to the user from localStorage
let followerCount = parseInt(localStorage.getItem(`${userId}_followerCount`)) || parseInt(followerCountElement.textContent);
let isFollowing = localStorage.getItem(`${userId}_isFollowing`) === 'true' || false;

function updateUI() {
  followerCountElement.textContent = followerCount;
  followButton.textContent = isFollowing ? 'Following' : 'Follow';
}

updateUI();

function handleFollowButtonClick() {
  if (isFollowing) {
    followerCount--;
  } else {
    followerCount++;
  }

  isFollowing = !isFollowing;

  // Save follower count and follow status specific to the user in localStorage
  localStorage.setItem(`${userId}_followerCount`, followerCount);
  localStorage.setItem(`${userId}_isFollowing`, isFollowing);

  updateUI();
}

followButton.addEventListener('click', handleFollowButtonClick);






const followButton = document.querySelector('.btn-follow');
const followerCountElement = document.querySelector('[data-followers-stat]');

// Retrieve follower count and following state from localStorage, or set default values
let followerCount = parseInt(localStorage.getItem('followerCount')) || parseInt(followerCountElement.textContent);
let isFollowing = localStorage.getItem('isFollowing') === 'true' || false;

// Function to update UI with follower count and button text
function updateUI() {
  followerCountElement.textContent = followerCount;
  followButton.textContent = isFollowing ? 'Following' : 'Follow';
}

// Initial UI update
updateUI();

function handleFollowButtonClick() {
  if (isFollowing) {
    // If already following, decrease the follower count
    followerCount--;
  } else {
    // If not following, increase the follower count
    followerCount++;
  }

  // Toggle following state
  isFollowing = !isFollowing;

  // Save follower count and following state to localStorage
  localStorage.setItem('followerCount', followerCount);
  localStorage.setItem('isFollowing', isFollowing);

  // Update the UI
  updateUI();
}

followButton.addEventListener('click', handleFollowButtonClick);







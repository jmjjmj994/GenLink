const followButton = document.querySelector('.btn-follow');
const followerCountElement = document.querySelector('[data-followers-stat]');





let followerCount = parseInt(localStorage.getItem('followerCount')) || parseInt(followerCountElement.textContent);
let isFollowing = localStorage.getItem('isFollowing') === 'true' || false;


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


  localStorage.setItem('followerCount', followerCount);
  localStorage.setItem('isFollowing', isFollowing);


  updateUI();
}

followButton.addEventListener('click', handleFollowButtonClick);








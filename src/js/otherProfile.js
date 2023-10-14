
 function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }


  const authorName = getQueryParam('name');


  const userNameElement = document.querySelector('.profile-main__user--name');

  
  if (userNameElement && authorName) {
    userNameElement.textContent = authorName;
  }


  
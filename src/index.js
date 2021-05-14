let users = [];
let posts = [];

let currentUserId = 0

// Create the HTML for the app
function createPage() {

    const rootEl = document.querySelector("#root")

    const mainHeaderEl = document.createElement('header')
    mainHeaderEl.setAttribute("class", "main-header")

    const wrapperDivEl = document.createElement('div')
    wrapperDivEl.setAttribute("class", "wrapper")

    mainHeaderEl.append(wrapperDivEl)

    rootEl.append(mainHeaderEl)

    //Create sections
    const mainEl = document.createElement('main')
    mainEl.setAttribute("class", "wrapper")

    const postSectionEl = document.createElement('section')
    postSectionEl.setAttribute("class", "create-post-section")

    const feedSectionEl = document.createElement('section')
    feedSectionEl.setAttribute("class", "feed")

    //Add sections to main
    mainEl.append(postSectionEl, feedSectionEl)

    const ulEl = document.createElement('ul')
    ulEl.setAttribute("class", "stack")

    feedSectionEl.append(ulEl)

    mainEl.append(feedSectionEl)

    rootEl.append(mainEl)
}

//Create a single user chip
function createSingleChip(user) {

    const chipEl = document.createElement('div')
    chipEl.setAttribute("class", "chip")

    const avatarSmallEl = document.createElement('div')
    avatarSmallEl.setAttribute("class", "avatar-small")

    const imgEl = document.createElement('img')
    imgEl.setAttribute("src", user.avatar)
    imgEl.setAttribute("alt", user.username)

    avatarSmallEl.append(imgEl)

    const spanEl = document.createElement('span')
    spanEl.innerText = user.username

    chipEl.append(avatarSmallEl, spanEl)

    return chipEl
}

//Create post form
function createPostForm() {

    const formEl = document.createElement('form')
    formEl.setAttribute("id", "create-post-form")
    formEl.setAttribute("autocomplete", "off")

    const h2El = document.createElement('h2')
    h2El.innerText = "Create a post"
    
    //Image
    const imgLabelEl = document.createElement('label')
    imgLabelEl.setAttribute("for", "image")
    imgLabelEl.innerText = "Image"

    const imgInputEl = document.createElement('input')
    imgInputEl.setAttribute("id", "image")
    imgInputEl.setAttribute("name", "image")
    imgInputEl.setAttribute("type", "text")

    //Title
    const titleLabelEl = document.createElement('label')
    titleLabelEl.setAttribute("for", "title")
    titleLabelEl.innerText = "Title"

    const titleInputEl = document.createElement('input')
    titleInputEl.setAttribute("id", "title")
    titleInputEl.setAttribute("name", "title")
    titleInputEl.setAttribute("type", "text")

    //Content
    const contentLabelEl = document.createElement('label')
    contentLabelEl.setAttribute("for", "content")
    contentLabelEl.innerText = "Content"

    const contentInputEl = document.createElement('textarea')
    contentInputEl.setAttribute("id", "content")
    contentInputEl.setAttribute("name", "content")
    contentInputEl.setAttribute("rows", "2")
    contentInputEl.setAttribute("columns", "30")

    //Buttons
    const divBtnEl = document.createElement('div')
    divBtnEl.setAttribute("class", "action-btns")

    const createBtnEl = document.createElement('button')
    createBtnEl.setAttribute("id", "preview-btn")
    createBtnEl.setAttribute("type", "button")
    createBtnEl.innerText = "Preview"

    const submitBtnEl = document.createElement('button')
    submitBtnEl.setAttribute("type", "submit")
    submitBtnEl.innerText = "Post"

    formEl.addEventListener("submit", function(event) {
      event.preventDefault();
      let image = formEl.image.value
      let title = formEl.title.value
      let content = formEl.content.value
      addPostData(title, content, image)
    });

    divBtnEl.append(createBtnEl, submitBtnEl)

    formEl.append(imgLabelEl, imgInputEl, titleLabelEl, titleInputEl, contentLabelEl, contentInputEl, divBtnEl)

    const postEl = document.querySelector(".create-post-section")
    postEl.append(formEl)

}

//Create a single post
function createPost(post) {

    const liEl = document.createElement('li')
    liEl.setAttribute("class", "post")
    const user = users.find(function (user) {
      return user.id === post.userId;
    });
  
    const chipEl = createSingleChip(user);
    
    //Create post image

    const feedPostImageDivEl = document.createElement('div')
    feedPostImageDivEl.setAttribute("class", "post--image")

    const feedPostImageEl = document.createElement('img')
    feedPostImageEl.setAttribute("src", post.image.src)
    feedPostImageEl.setAttribute("alt", post.image.alt)

    feedPostImageDivEl.append(feedPostImageEl)

    //Create post content
    const feedPostContentDivEl = document.createElement('div')
    feedPostContentDivEl.setAttribute("class", "post--content")

    const feedPostTitleEl = document.createElement('h2')
    feedPostTitleEl.innerText = post.title

    const feedPostContentEl = document.createElement('p')
    feedPostContentEl.innerText = post.content

    feedPostContentDivEl.append(feedPostTitleEl, feedPostContentEl)

    //Create comments section
    const feedPostCommentsDivEl = document.createElement('div')
    feedPostCommentsDivEl.setAttribute("class", "post--comments")

    const feedPostCommentsTitleEl = document.createElement('h3')
    feedPostCommentsTitleEl.innerText = "Comments"

    feedPostCommentsDivEl.append(feedPostCommentsTitleEl)

    for (const comment of post.comments) {
      // SINGLE COMMENT START
      const user = users.find(function (user) {
        return user.id === comment.userId;
      });

      const commentEl = document.createElement("div");
      commentEl.setAttribute("class", "post--comment");
  
      const avatarEl = document.createElement("div");
      avatarEl.setAttribute("class", "avatar-small");
  
      const commentImgEl = document.createElement("img");
      commentImgEl.setAttribute("src", user.avatar);
      commentImgEl.setAttribute("alt", user.username);
  
      avatarEl.append(commentImgEl);
  
      const commentTextEl = document.createElement("p");
      commentTextEl.innerText = comment.content;
  
      commentEl.append(avatarEl, commentTextEl);
      feedPostCommentsDivEl.append(commentEl);
      // SINGLE COMMENT END
    }
  
    // CREATE COMMENT FORM SECTION
    const formEl = document.createElement("form");
    formEl.setAttribute("id", "create-comment-form");
    formEl.setAttribute("autocomplete", "off");
  
    const commentLabelEl = document.createElement("label");
    commentLabelEl.setAttribute("for", "comment");
    commentLabelEl.innerText = "Add comment";
  
    const commentInputEl = document.createElement("input");
    commentInputEl.setAttribute("id", "comment");
    commentInputEl.setAttribute("name", "comment");
    commentInputEl.setAttribute("type", "text");
  
    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.innerText = "Comment";
  
    formEl.append(commentLabelEl, commentInputEl, submitBtn);
  
    liEl.append(chipEl, feedPostImageDivEl, feedPostContentDivEl, feedPostCommentsDivEl, formEl);
  
    return liEl;
}


// Get users data
function getUsersData() {

    fetch("http://localhost:3000/users") 
    .then(function (response) {
        return response.json();
      })
      .then(function (usersData) {
        users = usersData
        getPostsData()
        createMultipleChips(usersData);
      });
}

//Create mulitple chips and select current user
function createMultipleChips(users) {

    for (const user of users) {
      
      const chipEl = createSingleChip(user);


      chipEl.addEventListener("click", function () {
  
        const currentChipEl = document.querySelector(".active");

        currentUserId = user.id


        if (currentChipEl !== null) {
          currentChipEl.classList.remove("active");
        }
  
        chipEl.classList.add("active");
      });
      
      const wrapperEl = document.querySelector(".wrapper")
      wrapperEl.append(chipEl)
    }
}

// Get posts data
function getPostsData() {
  fetch("http://localhost:3000/posts")
      .then(function (response) {
        return response.json();
      })
      .then(function (postsFromServer) {
        posts = postsFromServer;
        for (const post of posts) {
          const liEl = createPost(post);
          ulEl.append(liEl);
        }
      });
    
    feedSectionEl = document.querySelector(".feed")
    ulEl = document.querySelector(".stack")
    feedSectionEl.append(ulEl);
    return feedSectionEl;
}

//Create feed
function createMulitplePosts(posts) {
    for (const post of posts) {
      createPost(post);
    }
}

function addPostData(title, content, image) {

  let post = {
    "title": title,
    "content": content,
    "image": { 
      "src": image
    },
    "userId": currentUserId
  }


    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(post)
  })
  .then(response => response.json())
  .then(post => {
    const postEl = createPost(post);
    ulEl.append(postEl);
    formEl.reset();
    console.log('Success:', post);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// formEl.addEventListener("submit", function (event) {
//   // - prevent the form from refreshing the page
//   event.preventDefault();

//   // if there's an active user
//   if (currentUser !== null) {
//     // - get and store comment data
//     const comment = {
//       content: formEl.comment.value,
//       userId: currentUser.id,
//       postId: post.id
//     };


// function getCommentData() {

//   formEl.addEventListener("submit", function (event) {
//     event.preventDefault();

//     if (currentUser !== null) {
//       const comment = {
//         content: formEl.comment.value,
//         userId: currentUser.id,
//         postId: post.id
//       }
//       return comment
//     }
  



// function addComment(comment) {

//     fetch("http://localhost:3000/comments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(comment)
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (newCommentFromServer) {
//         const commentEl = createCommentElement(newCommentFromServer);
//         postCommentsEl.append(commentEl);
//         formEl.reset();
//       });
//     }

function addPostToFeed() {

}


createPage()
getUsersData()
createPostForm()

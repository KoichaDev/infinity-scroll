const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// Fetch Posts from API

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit${limit}&_page=${page}`
  );
  return await res.json();
}

// show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.map((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title>${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>

    `;

    postsContainer.appendChild(postElement);
  });
}

// Show initial posts
showPosts();

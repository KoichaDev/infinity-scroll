const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
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
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>

    `;

    postsContainer.appendChild(postElement);
  });
}

// Show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

// Filter Posts by INput
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    //  returns the first index at which a given element can be found in the array, or -1 if it is not present.
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

filter.addEventListener('input', filterPosts);

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
    const { id, title, body } = post;
    const postElement = document.createElement('div');
    const numberDiv = document.createElement('div');
    const postInfoDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    postElement.classList.add('post');
    numberDiv.classList.add('number');
    postInfoDiv.classList.add('post-info');
    h2.classList.add('post-title');
    p.classList.add('post-body');

    numberDiv.innerText = id;
    h2.innerText = title;
    p.innerText = body;

    postsContainer.appendChild(postElement);

    postElement.appendChild(numberDiv);
    postElement.appendChild(postInfoDiv);

    postInfoDiv.appendChild(h2);
    postInfoDiv.appendChild(p);
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

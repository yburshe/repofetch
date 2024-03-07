const searchInput = document.getElementById("searchString");
const Repos = document.getElementById("repos");
const container = document.getElementById("container");
const thead = document.getElementById("repos-head");
const github_key =
  "GITHUB_KEY";
const currentUser = document.getElementById("user-info");

let debounceTimer;
searchInput.addEventListener("input", function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => searchUsers(searchInput.value.trim()), 250);
});

function getRepos(username, avatar) {
  container.innerHTML = "";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${github_key}`);
  headers.append("Accept", "application/vnd.github+json");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  let url = `https://api.github.com/users/${username}/repos`;
  let html = "";
  let htmlSegment = "";
  let userInfohtml = "";
  let description;
  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((repo) => {
        if (repo.description == null) {
          description = "-";
        } else {
          description = repo.description;
        }
        htmlSegment += `<tr><td>${repo.name}</td><td>${description}</td><td class="watchers">${repo.watchers_count}</td><td class="stars">${repo.stargazers_count}</td></tr>`;
      });
      userInfohtml = `<div class="user-info-wrapper"><div class="user-info"><img src="${avatar}"/><h2>${username}</h2></div><hr/></div>`;
      html += `<thead id="repos-head">
      <tr>
        <td>Name</td>
        <td>Description</td>
        <td class="watchers"><img src="eye.svg"/></td>
        <td class="stars"><img src="star.svg"/></td>
      </tr>
    </thead>${htmlSegment}`;
      Repos.innerHTML = html;
      currentUser.innerHTML = userInfohtml;
      console.log(currentUser.innerHTML);
    });
}

async function searchUsers(x) {
  currentUser.innerHTML = "";
  Repos.innerHTML = "";
  container.innerHTML = "";
  if (x === "") {
    return;
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${github_key}`);
  headers.append("Accept", "application/vnd.github+json");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  let url = `https://api.github.com/search/users?q=${x}`;
  let html = `<div class="results" >`;
  let count = 0;
  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      users = data.items;
      html += "<hr/>";
      users.forEach((user) => {
        if (count < 5) {
          htmlSegment = `<p onclick="getRepos('${user.login}', '${user.avatar_url}')""><img class="user_avatar" src="${user.avatar_url}"/>${user.login}</p>`;
          html += htmlSegment;
        }
        count++;
      });
      if (x == "") {
        container.innerHTML = "";
      }
      html += "</div>";
      container.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

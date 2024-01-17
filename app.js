const searchInput = document.getElementById("searchString");
const Repos = document.getElementById("repos");
const container = document.getElementById("container");

let debounceTimer;

searchInput.addEventListener("input", function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => searchUsers(searchInput.value.trim()), 250);
});

function getRepos(username) {
  container.innerHTML = "";
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer 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"
  );
  headers.append("Accept", "application/vnd.github+json");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  let url = `https://api.github.com/users/${username}/repos`;
  let html = `<div class="repos" >`;
  let htmlSegment = "";
  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((repo) => {
        htmlSegment += `<p>${repo.name}</p>`;
      });
      html += htmlSegment;
      Repos.innerHTML = html;
    });
}

async function searchUsers(x) {
  Repos.innerHTML = "";
  container.innerHTML = "";
  if (x === "") {
    return;
  }

  const headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer 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"
  );
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
      users.forEach((user) => {
        if (count < 5) {
          console.log("yo");
          htmlSegment = `<p onclick="getRepos('${user.login}')""><img class="user_avatar" src="${user.avatar_url}"/>${user.login}</p>`;
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

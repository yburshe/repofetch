async function getRepos(x) {
    let url = `https://api.github.com/users/${x}/repos`;
    try {
        let res = await fetch(url);
        console.log("Got Repos!")
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderRepos(x) {
    let repos = await getRepos(x);
    let html = "";
    let repo_description = "";
    repos.forEach((repo) => {
        if (repo.description == null) {
            repo_description = "No description";
        } else {
            repo_description = repo.description;
        }
        let htmlSegment = `<div class="repo">
                        <h2><a target="_blank" href=${repo.clone_url}>${repo.name}</a></h2>
                        <p>${repo_description}</p>
                        <p>Watchers: ${repo.watchers}</p>
                        <p>Forks: ${repo.forks}</p>
                    </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector(".container");
    container.innerHTML = html;
    console.log("Rendered Repos!")
}

function Click() {
    var x = document.getElementById("username").value;
    renderRepos(x);
}

Click();
import api from ./api

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");


searchForm.addEventListener("submit", (e) => {
    const searchTerm = searchInput.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.getElementById("limit").value;

    if (searchTerm === "") {
      showMessage("Please add a search term", "alert-danger");
    }
    searchInput.value = "";
    reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
        let output = '<div class="card-columns">';
        // loop through post
        results.forEach((post) => {
    
          output += `<div class="card">
            <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${post.url}" target="_blank" class="btn btn-dark">Read More</a>
            </div> 
            </div>`
        ;});
        output += "</div>";
        document.getElementById("results").innerHTML = output;
      });
  });
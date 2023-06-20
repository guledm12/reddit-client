import api from "./api";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const subredditFilter = document.getElementById("subreddit-filter");

// Form event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;
  const subreddit = "r/" + subredditFilter.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById("limit").value;

  let restrict;
  if (subredditFilter.value != "") {
    restrict = "&restrict_sr=1"
  } else {
    restrict = ""
  }

  console.log(restrict)
  if (searchTerm === "") {
    alert("Please add a search term");
  }
  api.search(searchTerm, subreddit, searchLimit, sortBy, restrict).then((results) => {
    let output = '<div class="card-columns">';
    results.forEach((post) => {

      output += `<div class="card">
        <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${truncateText(post.selftext, 100)}</p>
        <a href="${post.url}" target="_blank" class="btn btn-dark">Read More</a> 
        </div>
        </div>`;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
});

function truncateText(text,limit){
    const shortened =text.indexOf('', limit);
    if(shortened ==-1)return text;
    return text.substring(0, shortened);
}
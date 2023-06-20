export default {
  search: function (searchTerm, subreddit, searchLimit, sortBy, restrict) {
    return (
      fetch(`http://www.reddit.com/${subreddit}/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}${restrict}`)
        .then((res) => res.json())
        .then((data) => data.data.children.map((data) => data.data))
        .catch((err) => console.log(err))
    );
  },
};

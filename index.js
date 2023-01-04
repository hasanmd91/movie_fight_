const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return ` 
    <img  src =" ${imgSrc}"  />
    <p> ${movie.Title} (${movie.Year}) </p>
    `;
  },

  onInputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchparams) {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: "169390a7",
        s: searchparams,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
};

autoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"));
  },
});

autoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"));
  },
});

const onMovieSelect = async (movie, summaryElement) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "169390a7",
      i: movie.imdbID,
    },
  });

  summaryElement.innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetails) => {
  return ` 
  <article class="media">
  <figure class="media-left">
    <p class="image">
      <img src="${movieDetails.Poster}" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <h1>${movieDetails.Title} </h1>
      <h4>${movieDetails.Genre} </h4>
      <p>${movieDetails.Plot} </p>
    </div>
  </div>
</article>
<article class="notification is-primary">
<p class="title">${movieDetails.Awards}</p>
<p class="subtitle">Awards</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetails.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetails.Metascore}</p>
<p class="subtitle">Metascore </p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetails.imdbRating}</p>
<p class="subtitle">IMDB Rating</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetails.imdbVotes}</p>
<p class="subtitle">IMDB Votes</p>
</article>


`;
};

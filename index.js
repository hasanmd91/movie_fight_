// autoCompleteConfig functions

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

// left side autocomplete function call

autoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  },
});

// right side autocomplete function call

autoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});

// variables to identify which side movie was selected

let leftMovie;
let rightMovie;

// when select a movie from the dropdown

const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "169390a7",
      i: movie.imdbID,
    },
  });
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    console.log(" time to compare ");
  }
};

//making single movie template

const movieTemplate = (movieDetails) => {
  // parsing all statistis value to number
  const dollars = parseInt(
    movieDetails.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieDetails.Metascore);
  const imdbrating = parseFloat(movieDetails.imdbRating);
  const imdbvotes = parseFloat(movieDetails.imdbVotes.replace(/,/g, ""));
  const awards = movieDetails.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

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
<article data-value=${awards} class="notification is-primary">
<p class="title">${movieDetails.Awards}</p>
<p class="subtitle">Awards</p>
</article>
<article data-value=${dollars} class="notification is-primary">
<p class="title">${movieDetails.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>
<article data-value=${metascore} class="notification is-primary">
<p class="title">${movieDetails.Metascore}</p>
<p class="subtitle">Metascore </p>
</article>
<article data-value=${imdbrating} class="notification is-primary">
<p class="title">${movieDetails.imdbRating}</p>
<p class="subtitle">IMDB Rating</p>
</article>
<article data-value=${imdbvotes} class="notification is-primary">
<p class="title">${movieDetails.imdbVotes}</p>
<p class="subtitle">IMDB Votes</p>
</article>


`;
};

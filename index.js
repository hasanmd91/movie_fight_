const fetchData = async (searhTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "333e8f3",
      s: searhTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label> <b> Search for a Movie <b></label>
<input class="input"/> 
  <div class="dropdown"> 
    <div class="dropdown-menu" > 
    <div class="dropdown-content results"> </div> 
    </div>  
  </div> 
`;
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (e) => {
  const movies = await fetchData(e.target.value);
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");
    option.classList.add("dropdown-item");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    option.innerHTML = ` 
    <img src="${imgSrc}"/> 
     ${movie.Title}`;

    option.addEventListener("click", (e) => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;

      onMovieSelect(movie);
    });

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 1000));

document.addEventListener("click", (e) => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "333e8f3",
      i: movie.imdbID,
    },
  });

  document.querySelector(".summry").innerHTML = movieTemplate(response.data);
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
      <div class ="content">
      <h1> ${movieDetails.Title} </h1>
      <h4> ${movieDetails.Genre} </h4>
      <p>   ${movieDetails.Plot} </p>
      </div>
    </div>
  </article>

  <article class="notification is-primary"> 
    <p class ="title"> ${movieDetails.Awards} </p>
    <p class="subtitle"> Awards </p>
  </article>

  <article class="notification is-primary"> 
    <p class ="title"> ${movieDetails.BoxOffice} </p>
    <p class="subtitle"> BoxOffice </p>
  </article>

    <article class="notification is-primary"> 
    <p class ="title"> ${movieDetails.Metascore} </p>
    <p class="subtitle"> Metascore </p>
  </article>

  <article class="notification is-primary"> 
    <p class ="title"> ${movieDetails.imdbRating} </p>
    <p class="subtitle"> IMDB Rating </p>
  </article>

  <article class="notification is-primary"> 
    <p class ="title"> ${movieDetails.imdbVotes} </p>
    <p class="subtitle"> IMDB Votes </p>
  </article>
  `;
};

const fetchdata = async (searchparams) => {
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
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label>  <b> Serach for a Movie </b> </label> 
<input class ="input">
<div class="dropdown ">
  <div class ="dropdown-menu">
    <div class ="dropdown-content result"> </div>
  </div>
</div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".result");

const onInput = async (e) => {
  const movies = await fetchdata(e.target.value);
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }

  dropdown.classList.add("is-active");
  resultsWrapper.innerHTML = "";
  for (let movie of movies) {
    const option = document.createElement("a");
    option.classList.add("dropdown-item");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.innerHTML = ` 
    <img  src =" ${imgSrc}"  />
    <p> ${movie.Title} (${movie.Year}) </p>
    `;

    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
    });

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (e) => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});

const onMovieSelect = async (Movie) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "169390a7",
      i: Movie.imdbID,
    },
  });

  document.querySelector(".summary").innerHTML = movieTemplate(response.data);
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


`;
};

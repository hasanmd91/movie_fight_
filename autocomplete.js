const autoComplete = ({ root }) => {
  root.innerHTML = `
<label> <b> Serach for a Movie </b> </label>
<input class="input" />
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content result"></div>
  </div>
</div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".result");

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
};

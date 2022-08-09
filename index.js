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

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 1000));

document.addEventListener("click", (e) => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});

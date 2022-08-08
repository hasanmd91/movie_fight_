const fetchData = async (searhTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "333e8f3",
      s: searhTerm,
    },
  });

  return response.data.Search;
};
const input = document.querySelector("input");

const onInput = async (e) => {
  const movies = await fetchData(e.target.value);
  console.log(movies);
  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = ` <img  src="${movie.Poster}"/> 
    <h1> ${movie.Title}`;

    document.getElementById("target").appendChild(div);
  }
};

input.addEventListener("input", debounce(onInput, 1000));

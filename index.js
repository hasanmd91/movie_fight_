const fetchData = async (searhTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "333e8f3",
      s: searhTerm,
    },
  });
};
const input = document.querySelector("input");

const onInput = (e) => {
  fetchData(e.target.value);
};

input.addEventListener("input", debounce(onInput, 1000));

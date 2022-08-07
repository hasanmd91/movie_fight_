const fetchData = async (searhTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "333e8f3",
      s: searhTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector("input");
input.addEventListener("input", (e) => {
  fetchData(e.target.value);
});

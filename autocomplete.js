const autoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  onInputValue,
  fetchData,
}) => {
  root.innerHTML = `
<label> <b> Serach for a item </b> </label>
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
    const items = await fetchData(e.target.value);
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    dropdown.classList.add("is-active");
    resultsWrapper.innerHTML = "";
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = onInputValue(item);
        onOptionSelect(item);
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

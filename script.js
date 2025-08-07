document.addEventListener("DOMContentLoaded", () => {
  const csvFilePath = "restaurants.csv";

  Papa.parse(csvFilePath, {
    header: true,
    download: true,
    complete: function (results) {
      const data = results.data.filter(row => row["店名"]);
      initApp(data);
    }
  });
});

function initApp(data) {
  const restaurantList = document.getElementById("restaurantList");
  const template = document.getElementById("restaurantTemplate");

  const placeFilter = document.getElementById("placeFilter");
  const floorFilter = document.getElementById("floorFilter");
  const genreFilter = document.getElementById("genreFilter");

  const getUniqueValues = (field) => [...new Set(data.map(item => item[field]).filter(Boolean))];
  const createOptions = (select, values) => {
    select.innerHTML = `<option value="">すべて</option>`;
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  };

  createOptions(placeFilter, getUniqueValues("場所"));
  createOptions(floorFilter, getUniqueValues("階数"));
  createOptions(genreFilter, getUniqueValues("ジャンル"));

  const filters = [placeFilter, floorFilter, genreFilter];
  filters.forEach(filter => filter.addEventListener("change", renderList));

  function renderList() {
    restaurantList.innerHTML = "";

    data.forEach((item, index) => {
      if (
        (placeFilter.value && item["場所"] !== placeFilter.value) ||
        (floorFilter.value && item["階数"] !== floorFilter.value) ||
        (genreFilter.value && item["ジャンル"] !== genreFilter.value)
      ) {
        return;
      }

      const clone = template.content.cloneNode(true);
      const card = clone.querySelector(".restaurant-card");
      const title = clone.querySelector(".restaurant-title");
      const info = clone.querySelector(".restaurant-info");
      const note = clone.querySelector(".restaurant-note");
      const imageInput = clone.querySelector(".restaurant-image-input");
      const imageContainer = clone.querySelector(".restaurant-image-container");
      const link = clone.querySelector(".restaurant-link");
      const visitCheckbox = clone.querySelector(".visit-check");

      const id = `restaurant_${index}`;
      const savedNote = localStorage.getItem(`${id}_note`);
      const savedImage = localStorage.getItem(`${id}_image`);
      const visited = localStorage.getItem(`${id}_visited`) === "true";

      title.textContent = item["店名"];
      info.textContent = `${item["場所"] || ""} / ${item["階数"] || ""} / ${item["ジャンル"] || ""}`;
      note.value = savedNote || "";
      link.href = `https://www.google.com/search?q=${encodeURIComponent(item["店名"])}`;
      visitCheckbox.checked = visited;

      if (visited) card.classList.add("visited");

      title.addEventListener("click", () => {
        card.classList.toggle("open");
      });

      note.addEventListener("input", () => {
        localStorage.setItem(`${id}_note`, note.value);
      });

      visitCheckbox.addEventListener("change", () => {
        const isChecked = visitCheckbox.checked;
        card.classList.toggle("visited", isChecked);
        localStorage.setItem(`${id}_visited`, isChecked);
      });

      imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          imageContainer.innerHTML = "";
          imageContainer.appendChild(img);
          localStorage.setItem(`${id}_image`, reader.result);
        };
        reader.readAsDataURL(file);
      });

      if (savedImage) {
        const img = new Image();
        img.src = savedImage;
        imageContainer.appendChild(img);
      }

      restaurantList.appendChild(clone);
    });
  }

  renderList();
}

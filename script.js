document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("restaurant-list");
  const filters = {
    place: document.getElementById("place-filter"),
    floor: document.getElementById("floor-filter"),
    genre: document.getElementById("genre-filter")
  };

  // ユニークな値を収集してフィルターに追加
  const restaurants = window.restaurantData || [];
  const places = new Set();
  const floors = new Set();
  const genres = new Set();

  restaurants.forEach(r => {
    places.add(r.place);
    floors.add(r.floor);
    genres.add(r.genre);
  });

  function populateFilter(selectElement, values) {
    selectElement.innerHTML = `<option value="">すべて</option>`;
    [...values].sort().forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      selectElement.appendChild(option);
    });
  }

  populateFilter(filters.place, places);
  populateFilter(filters.floor, floors);
  populateFilter(filters.genre, genres);

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function loadFromLocalStorage(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  const visited = loadFromLocalStorage("visited", {});
  const memos = loadFromLocalStorage("memos", {});
  const images = loadFromLocalStorage("images", {});

  function createRestaurantElement(restaurant, index) {
    const div = document.createElement("div");
    div.className = "restaurant";
    if (visited[index]) div.classList.add("visited");

    const header = document.createElement("div");
    header.className = "restaurant-header";
    header.innerHTML = `<span>${restaurant.place} ${restaurant.floor}F｜${restaurant.genre}｜${restaurant.name}</span>`;

    const content = document.createElement("div");
    content.className = "restaurant-content";

    const memoInput = document.createElement("textarea");
    memoInput.placeholder = "メモを入力";
    memoInput.value = memos[index] || "";
    memoInput.addEventListener("input", (e) => {
      memos[index] = e.target.value;
      saveToLocalStorage("memos", memos);
    });

    const searchLink = document.createElement("a");
    searchLink.href = `https://www.google.com/search?q=${encodeURIComponent(restaurant.name)}`;
    searchLink.textContent = "Googleで検索";
    searchLink.target = "_blank";

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        images[index] = reader.result;
        saveToLocalStorage("images", images);
        imagePreview.src = reader.result;
        imagePreview.style.display = "block";
        deleteBtn.style.display = "inline";
      };
      reader.readAsDataURL(file);
    });

    const imagePreview = document.createElement("img");
    imagePreview.src = images[index] || "";
    imagePreview.style.display = images[index] ? "block" : "none";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "写真を削除";
    deleteBtn.style.display = images[index] ? "inline" : "none";
    deleteBtn.addEventListener("click", () => {
      delete images[index];
      saveToLocalStorage("images", images);
      imagePreview.src = "";
      imagePreview.style.display = "none";
      deleteBtn.style.display = "none";
    });

    content.appendChild(memoInput);
    content.appendChild(searchLink);
    content.appendChild(imageInput);
    content.appendChild(imagePreview);
    content.appendChild(deleteBtn);

    // 表示切り替え
    header.addEventListener("click", (e) => {
      if (e.target !== memoInput && !content.contains(e.target)) {
        content.style.display = content.style.display === "block" ? "none" : "block";
        visited[index] = !visited[index];
        saveToLocalStorage("visited", visited);
        div.classList.toggle("visited");
      }
    });

    div.appendChild(header);
    div.appendChild(content);
    return div;
  }

  function renderRestaurants() {
    container.innerHTML = "";
    const placeValue = filters.place.value;
    const floorValue = filters.floor.value;
    const genreValue = filters.genre.value;

    restaurants.forEach((restaurant, index) => {
      if (
        (!placeValue || restaurant.place === placeValue) &&
        (!floorValue || restaurant.floor === floorValue) &&
        (!genreValue || restaurant.genre === genreValue)
      ) {
        const restaurantEl = createRestaurantElement(restaurant, index);
        container.appendChild(restaurantEl);
      }
    });
  }

  Object.values(filters).forEach(select => {
    select.addEventListener("change", renderRestaurants);
  });

  renderRestaurants();
});

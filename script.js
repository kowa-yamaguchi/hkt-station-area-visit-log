document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("restaurantList");
  const template = document.getElementById("restaurantTemplate");
  const placeFilter = document.getElementById("placeFilter");
  const floorFilter = document.getElementById("floorFilter");
  const genreFilter = document.getElementById("genreFilter");

  fetch("restaurants.csv")
    .then(response => response.text())
    .then(csv => {
      const data = Papa.parse(csv, { header: true }).data;
      const places = new Set();
      const floors = new Set();
      const genres = new Set();

      data.forEach((row, index) => {
        if (!row["店名"]) return;

        const card = template.content.cloneNode(true);
        const container = card.querySelector(".restaurant-card");
        const title = card.querySelector(".restaurant-name");
        const meta = card.querySelector(".restaurant-meta");
        const memo = card.querySelector(".memo");
        const fileInput = card.querySelector(".photo-upload");
        const photoPreview = card.querySelector(".photo-preview");
        const deleteButton = card.querySelector(".delete-photo-button");
        const googleLink = card.querySelector(".google-search");

        const id = `${row["場所"]}_${row["階数"]}_${row["ジャンル"]}_${row["店名"]}`;
        const visited = localStorage.getItem(`${id}_visited`) === "true";
        const savedMemo = localStorage.getItem(`${id}_memo`);
        const savedPhoto = localStorage.getItem(`${id}_photo`);

        title.textContent = row["店名"];
        meta.textContent = `${row["場所"] || ""} / ${row["階数"] || ""} / ${row["ジャンル"] || ""}`;
        googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(row["店名"])}`;
        memo.value = savedMemo || "";

        if (visited) container.classList.add("visited");
        if (savedPhoto) {
          const img = document.createElement("img");
          img.src = savedPhoto;
          photoPreview.appendChild(img);
        }

        title.addEventListener("click", () => {
          container.classList.toggle("open");
          container.classList.toggle("visited");
          const isVisited = container.classList.contains("visited");
          localStorage.setItem(`${id}_visited`, isVisited);
        });

        memo.addEventListener("input", () => {
          localStorage.setItem(`${id}_memo`, memo.value);
        });

        fileInput.addEventListener("change", () => {
          const file = fileInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = e => {
              localStorage.setItem(`${id}_photo`, e.target.result);
              photoPreview.innerHTML = `<img src="${e.target.result}" />`;
            };
            reader.readAsDataURL(file);
          }
        });

        deleteButton.addEventListener("click", () => {
          localStorage.removeItem(`${id}_photo`);
          photoPreview.innerHTML = "";
        });

        listContainer.appendChild(card);

        // フィルター用にセット
        if (row["場所"]) places.add(row["場所"]);
        if (row["階数"]) floors.add(row["階数"]);
        if (row["ジャンル"]) genres.add(row["ジャンル"]);
      });

      // フィルター選択肢を作成
      const makeOptions = (select, set) => {
        [...set].sort().forEach(v => {
          const option = document.createElement("option");
          option.value = v;
          option.textContent = v;
          select.appendChild(option);
        });
      };

      makeOptions(placeFilter, places);
      makeOptions(floorFilter, floors);
      makeOptions(genreFilter, genres);

      const applyFilters = () => {
        const cards = listContainer.querySelectorAll(".restaurant-card");
        cards.forEach(card => {
          const meta = card.querySelector(".restaurant-meta").textContent;
          const matchPlace = placeFilter.value === "all" || meta.includes(placeFilter.value);
          const matchFloor = floorFilter.value === "all" || meta.includes(floorFilter.value);
          const matchGenre = genreFilter.value === "all" || meta.includes(genreFilter.value);
          card.style.display = (matchPlace && matchFloor && matchGenre) ? "" : "none";
        });
      };

      [placeFilter, floorFilter, genreFilter].forEach(select => {
        select.addEventListener("change", applyFilters);
      });
    });
});

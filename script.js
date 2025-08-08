let restaurants = [];
let filters = { location: "", floor: "", genre: "" };

// CSV読み込み
Papa.parse("restaurants.csv", {
  download: true,
  header: true,
  complete: function(results) {
    restaurants = results.data;
    populateFilters();
    renderList();
  }
});

function populateFilters() {
  const locations = [...new Set(restaurants.map(r => r.場所).filter(Boolean))];
  const floors = [...new Set(restaurants.map(r => r.階数).filter(Boolean))];
  const genres = [...new Set(restaurants.map(r => r.ジャンル).filter(Boolean))];

  const locationSelect = document.getElementById("locationFilter");
  locations.forEach(loc => {
    const opt = document.createElement("option");
    opt.value = loc;
    opt.textContent = loc;
    locationSelect.appendChild(opt);
  });

  const floorSelect = document.getElementById("floorFilter");
  floors.forEach(floor => {
    const opt = document.createElement("option");
    opt.value = floor;
    opt.textContent = floor;
    floorSelect.appendChild(opt);
  });

  const genreSelect = document.getElementById("genreFilter");
  genres.forEach(genre => {
    const opt = document.createElement("option");
    opt.value = genre;
    opt.textContent = genre;
    genreSelect.appendChild(opt);
  });

  locationSelect.addEventListener("change", e => {
    filters.location = e.target.value;
    renderList();
  });
  floorSelect.addEventListener("change", e => {
    filters.floor = e.target.value;
    renderList();
  });
  genreSelect.addEventListener("change", e => {
    filters.genre = e.target.value;
    renderList();
  });
}

function renderList() {
  const list = document.getElementById("restaurantList");
  list.innerHTML = "";

  restaurants
    .filter(r => (!filters.location || r.場所 === filters.location) &&
                 (!filters.floor || r.階数 === filters.floor) &&
                 (!filters.genre || r.ジャンル === filters.genre))
    .forEach((r, index) => {
      const key = `${r.場所}-${r.階数}-${r.店名}`;
      const visited = localStorage.getItem(`visited-${key}`) === "true";
      const memo = localStorage.getItem(`memo-${key}`) || "";
      const photos = JSON.parse(localStorage.getItem(`photos-${key}`) || "[]");

      const container = document.createElement("div");
      container.className = "restaurant" + (visited ? " visited" : "");

      const header = document.createElement("div");
      header.className = "restaurant-header";
      header.innerHTML = `<span>${r.店名} (${r.場所 || ""} ${r.階数 || ""} ${r.ジャンル || ""})</span>
                          <input type="checkbox" ${visited ? "checked" : ""} title="訪問済み">`;
      const checkbox = header.querySelector("input");
      checkbox.addEventListener("click", e => {
        e.stopPropagation();
        localStorage.setItem(`visited-${key}`, e.target.checked);
        renderList();
      });

      header.addEventListener("click", () => {
        details.style.display = details.style.display === "block" ? "none" : "block";
      });

      const details = document.createElement("div");
      details.className = "details";

      // Google検索リンク
      const googleLink = document.createElement("a");
      googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(r.店名)}`;
      googleLink.target = "_blank";
      googleLink.textContent = "Googleで検索";
      details.appendChild(googleLink);

      // メモ
      const memoArea = document.createElement("textarea");
      memoArea.value = memo;
      memoArea.addEventListener("input", () => {
        localStorage.setItem(`memo-${key}`, memoArea.value);
      });
      details.appendChild(memoArea);

      // 画像追加
      const photoInput = document.createElement("input");
      photoInput.type = "file";
      photoInput.accept = "image/*";
      photoInput.addEventListener("change", e => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            photos.push(evt.target.result);
            localStorage.setItem(`photos-${key}`, JSON.stringify(photos));
            renderList();
          };
          reader.readAsDataURL(file);
        }
      });
      details.appendChild(photoInput);

      // 画像プレビュー
      const photoPreview = document.createElement("div");
      photoPreview.className = "image-preview";
      photos.forEach((src, idx) => {
        const wrapper = document.createElement("div");
        const img = document.createElement("img");
        img.src = src;
        const delBtn = document.createElement("button");
        delBtn.className = "delete-photo";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", () => {
          photos.splice(idx, 1);
          localStorage.setItem(`photos-${key}`, JSON.stringify(photos));
          renderList();
        });
        wrapper.appendChild(img);
        wrapper.appendChild(delBtn);
        photoPreview.appendChild(wrapper);
      });
      details.appendChild(photoPreview);

      container.appendChild(header);
      container.appendChild(details);
      list.appendChild(container);
    });
}

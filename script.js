document.addEventListener("DOMContentLoaded", () => {
  const restaurantList = document.getElementById("restaurantList");
  const placeFilter = document.getElementById("placeFilter");
  const floorFilter = document.getElementById("floorFilter");
  const genreFilter = document.getElementById("genreFilter");

  Papa.parse("restaurants.csv", {
    download: true,
    header: true,
    complete: (results) => {
      const restaurants = results.data.filter(r => r.店名);
      populateFilters(restaurants);
      renderList(restaurants);

      placeFilter.addEventListener("change", () => renderList(restaurants));
      floorFilter.addEventListener("change", () => renderList(restaurants));
      genreFilter.addEventListener("change", () => renderList(restaurants));
    }
  });

  function populateFilters(data) {
    const places = [...new Set(data.map(r => r.場所))];
    const floors = [...new Set(data.map(r => r.階数))];
    const genres = [...new Set(data.map(r => r.ジャンル))];

    places.forEach(p => placeFilter.innerHTML += `<option value="${p}">${p}</option>`);
    floors.forEach(f => floorFilter.innerHTML += `<option value="${f}">${f}</option>`);
    genres.forEach(g => genreFilter.innerHTML += `<option value="${g}">${g}</option>`);
  }

  function renderList(data) {
    restaurantList.innerHTML = "";
    const placeVal = placeFilter.value;
    const floorVal = floorFilter.value;
    const genreVal = genreFilter.value;

    data.filter(r =>
      (!placeVal || r.場所 === placeVal) &&
      (!floorVal || r.階数 === floorVal) &&
      (!genreVal || r.ジャンル === genreVal)
    ).forEach(r => {
      const id = `${r.場所}-${r.階数}-${r.ジャンル}-${r.店名}`;
      const visited = localStorage.getItem(`visited-${id}`) === "true";
      const memo = localStorage.getItem(`memo-${id}`) || "";
      const photo = localStorage.getItem(`photo-${id}`);

      const div = document.createElement("div");
      div.className = `restaurant ${visited ? "visited" : ""}`;
      div.innerHTML = `
        <div class="restaurant-header">
          <div class="restaurant-name">${r.店名} (${r.場所} ${r.階数} ${r.ジャンル})</div>
          <div class="toggle-details">▼</div>
        </div>
        <div class="details">
          <textarea placeholder="メモを入力">${memo}</textarea>
          <br>
          <input type="file" accept="image/*">
          ${photo ? `<img src="${photo}" class="photo-preview"><button class="delete-photo">写真削除</button>` : ""}
          <br>
          <a href="https://www.google.com/search?q=${encodeURIComponent(r.店名)}" target="_blank">Googleで検索</a>
        </div>
      `;

      // 訪問済みトグル（店名クリック）
      div.querySelector(".restaurant-name").addEventListener("click", () => {
        div.classList.toggle("visited");
        localStorage.setItem(`visited-${id}`, div.classList.contains("visited"));
      });

      // アコーディオン開閉（右端アイコン）
      div.querySelector(".toggle-details").addEventListener("click", () => {
        const details = div.querySelector(".details");
        details.style.display = details.style.display === "block" ? "none" : "block";
      });

      // メモ保存
      div.querySelector("textarea").addEventListener("input", e => {
        localStorage.setItem(`memo-${id}`, e.target.value);
      });

      // 写真保存
      div.querySelector("input[type='file']").addEventListener("change", e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          localStorage.setItem(`photo-${id}`, ev.target.result);
          renderList(data); // 再描画して反映
        };
        reader.readAsDataURL(file);
      });

      // 写真削除
      const delBtn = div.querySelector(".delete-photo");
      if (delBtn) {
        delBtn.addEventListener("click", () => {
          localStorage.removeItem(`photo-${id}`);
          renderList(data);
        });
      }

      restaurantList.appendChild(div);
    });
  }
});

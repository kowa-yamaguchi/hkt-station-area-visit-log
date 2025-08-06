document.addEventListener('DOMContentLoaded', () => {
  const restaurantList = document.getElementById('restaurant-list');
  const locationFilter = document.getElementById('location-filter');
  const floorFilter = document.getElementById('floor-filter');
  const genreFilter = document.getElementById('genre-filter');

  let allRestaurants = [];

  // ✅ CSVファイルのURL（GitHub Pages上）
  const CSV_URL = 'restaurants.csv'; // または絶対URL

  Papa.parse(CSV_URL, {
    download: true,
    header: true,
    complete: function(results) {
      allRestaurants = results.data.filter(row => row.店名); // 空行除外
      populateFilters(allRestaurants);
      renderRestaurants(allRestaurants);
    }
  });

  // ✅ プルダウンに選択肢を追加
  function populateFilters(data) {
    const locations = [...new Set(data.map(r => r.場所).filter(Boolean))];
    const floors = [...new Set(data.map(r => r.階数).filter(Boolean))];
    const genres = [...new Set(data.map(r => r.ジャンル).filter(Boolean))];

    locations.sort().forEach(loc => {
      locationFilter.innerHTML += `<option value="${loc}">${loc}</option>`;
    });
    floors.sort().forEach(floor => {
      floorFilter.innerHTML += `<option value="${floor}">${floor}</option>`;
    });
    genres.sort().forEach(gen => {
      genreFilter.innerHTML += `<option value="${gen}">${gen}</option>`;
    });
  }

  // ✅ 店舗リストを描画
  function renderRestaurants(data) {
    restaurantList.innerHTML = '';
    data.forEach((store, index) => {
      const id = `${store.場所}_${store.階数}_${store.ジャンル}_${store.店名}`.replace(/\s+/g, '_');
      const visited = localStorage.getItem(`visited_${id}`) === 'true';
      const memo = localStorage.getItem(`memo_${id}`) || '';
      const imageData = localStorage.getItem(`image_${id}`);

      const div = document.createElement('div');
      div.className = `restaurant-item ${visited ? 'visited' : ''}`;
      div.innerHTML = `
        <div class="main-info">
          <strong>${store.店名}</strong>（${store.ジャンル}／${store.場所} ${store.階数}F）
        </div>
        <div class="details" style="display:none;">
          <textarea placeholder="メモを入力" data-id="${id}">${memo}</textarea>
          <div>
            <input type="file" accept="image/*" data-id="${id}" />
            ${imageData ? `<img src="${imageData}" class="preview" /><button class="delete-image" data-id="${id}">写真削除</button>` : ''}
          </div>
          <a href="https://www.google.com/search?q=${encodeURIComponent(store.店名)}" target="_blank">Googleで検索</a>
        </div>
      `;
      div.addEventListener('click', () => {
        div.classList.toggle('visited');
        const newStatus = div.classList.contains('visited');
        localStorage.setItem(`visited_${id}`, newStatus);
        const detail = div.querySelector('.details');
        detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
      });
      restaurantList.appendChild(div);
    });
    attachEventListeners();
  }

  // ✅ 絞り込み処理
  function applyFilters() {
    const location = locationFilter.value;
    const floor = floorFilter.value;
    const genre = genreFilter.value;
    const filtered = allRestaurants.filter(r => {
      return (!location || r.場所 === location) &&
             (!floor || r.階数 === floor) &&
             (!genre || r.ジャンル === genre);
    });
    renderRestaurants(filtered);
  }

  locationFilter.addEventListener('change', applyFilters);
  floorFilter.addEventListener('change', applyFilters);
  genreFilter.addEventListener('change', applyFilters);

  // ✅ イベント再付与（画像、メモ、削除）
  function attachEventListeners() {
    document.querySelectorAll('textarea').forEach(area => {
      area.addEventListener('input', (e) => {
        const id = e.target.dataset.id;
        localStorage.setItem(`memo_${id}`, e.target.value);
      });
    });

    document.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(event) {
            localStorage.setItem(`image_${id}`, event.target.result);
            applyFilters(); // 再描画して反映
          };
          reader.readAsDataURL(file);
        }
      });
    });

    document.querySelectorAll('.delete-image').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.target.dataset.id;
        localStorage.removeItem(`image_${id}`);
        applyFilters(); // 再描画
      });
    });
  }
});

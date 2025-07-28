const shops = [
  { name: "一風堂", area: "くうてん" },
  { name: "もつ鍋おおやま", area: "くうてん" },
  { name: "スターバックス", area: "アミュプラザ博多" },
  { name: "資さんうどん", area: "KITTE博多" },
  { name: "うまや", area: "博多阪急" },
  { name: "お好み焼き本舗", area: "マルイ博多" },
  // ※必要に応じて続き追加可能（全店舗）
];

const list = document.getElementById("shopList");
const areaFilter = document.getElementById("areaFilter");

function renderShops(area = "all") {
  list.innerHTML = "";

  shops
    .filter(shop => area === "all" || shop.area === area)
    .forEach((shop, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${shop.area}：${shop.name}</strong>
        <button onclick="toggleDetails(${index})">記録</button>
        <div id="details-${index}" style="display:none;">
          <textarea placeholder="メモを入力"></textarea>
          <a href="https://www.google.com/search?q=${encodeURIComponent(shop.name)}" target="_blank">Googleで検索</a>
          <input type="file" accept="image/*" onchange="previewImage(event, ${index})">
          <img id="img-${index}" style="display:none;">
        </div>
      `;
      list.appendChild(li);
    });
}

function toggleDetails(index) {
  const el = document.getElementById(`details-${index}`);
  el.style.display = el.style.display === "none" ? "block" : "none";
}

function previewImage(event, index) {
  const img = document.getElementById(`img-${index}`);
  const file = event.target.files[0];
  if (file) {
    img.src = URL.createObjectURL(file);
    img.style.display = "block";
  }
}

areaFilter.addEventListener("change", (e) => {
  renderShops(e.target.value);
});

renderShops();

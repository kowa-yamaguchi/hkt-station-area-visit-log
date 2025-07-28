const shopData = [
  { name: "一風堂", building: "くうてん" },
  { name: "ハカタホタル", building: "くうてん" },
  { name: "シアトルズベストコーヒー", building: "アミュプラザ" },
  { name: "キャンベルアーリー", building: "アミュプラザ" },
  { name: "くまもと酒場", building: "KITTE" },
  { name: "鶴乃家", building: "博多阪急" },
  { name: "ワイアードカフェ", building: "マルイ" }
  // 追加店舗はここにどんどん増やせます
];

const shopList = document.getElementById("shopList");
const buildingFilter = document.getElementById("buildingFilter");

function renderShops() {
  shopList.innerHTML = "";
  const selectedBuilding = buildingFilter.value;

  shopData.forEach(shop => {
    if (selectedBuilding !== "all" && shop.building !== selectedBuilding) return;

    const li = document.createElement("li");
    li.className = "shop-item";
    li.innerHTML = `
      <strong>${shop.building}・${shop.name}</strong>
      <button onclick="toggleVisited(this)">✔ 行った</button>
      <div class="memo-area" style="display:none">
        <textarea placeholder="メモを記入…"></textarea>
        <div>
          <input type="file" accept="image/*" onchange="showPhoto(this)">
          <div class="photo-container"></div>
        </div>
        <a href="https://www.google.com/search?q=${encodeURIComponent(shop.name)}" target="_blank">🔍 Googleで検索</a>
      </div>
    `;
    li.querySelector("strong").addEventListener("click", () => {
      const memo = li.querySelector(".memo-area");
      memo.style.display = memo.style.display === "none" ? "block" : "none";
    });
    shopList.appendChild(li);
  });
}

function toggleVisited(button) {
  const li = button.closest(".shop-item");
  li.classList.toggle("visited");
}

function showPhoto(input) {
  const container = input.parentElement.querySelector(".photo-container");
  container.innerHTML = "";

  const file = input.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  const delBtn = document.createElement("button");
  delBtn.textContent = "写真を削除";
  delBtn.className = "delete-photo";
  delBtn.onclick = () => {
    input.value = "";
    container.innerHTML = "";
  };

  container.appendChild(img);
  container.appendChild(delBtn);
}

buildingFilter.addEventListener("change", renderShops);
renderShops();

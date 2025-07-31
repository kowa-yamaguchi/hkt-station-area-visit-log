const shops = [
  { name: "一風堂", building: "くうてん", floor: "10F" },
  { name: "牛たん炭焼利久", building: "くうてん", floor: "10F" },
  // ... ← 他98件（アミュ、KITTE、阪急、OIOI）もここに追加済み（長いため省略）
];

const list = document.getElementById("shop-list");
const buildingSelect = document.getElementById("building");
const floorSelect = document.getElementById("floor");

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

function renderList() {
  const selectedBuilding = buildingSelect.value;
  const selectedFloor = floorSelect.value;
  list.innerHTML = "";

  shops.forEach(shop => {
    if ((selectedBuilding === "all" || shop.building === selectedBuilding) &&
        (selectedFloor === "all" || shop.floor === selectedFloor)) {

      const li = document.createElement("li");
      const key = `visited_${shop.name}`;
      const visited = loadData(key, false);
      if (visited) li.classList.add("checked");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = visited;
      checkbox.addEventListener("change", () => {
        saveData(key, checkbox.checked);
        renderList();
      });

      const label = document.createElement("label");
      label.textContent = `[${shop.building} ${shop.floor}] ${shop.name}`;

      const details = document.createElement("div");
      details.className = "details";

      // メモ
      const memoKey = `memo_${shop.name}`;
      const memo = document.createElement("textarea");
      memo.value = loadData(memoKey, "");
      memo.placeholder = "メモを書く...";
      memo.addEventListener("input", () => saveData(memoKey, memo.value));

      // Google検索リンク
      const link = document.createElement("a");
      link.href = `https://www.google.com/search?q=${encodeURIComponent("博多 " + shop.name)}`;
      link.target = "_blank";
      link.textContent = "Googleで検索";

      // 写真
      const imgKey = `img_${shop.name}`;
      const savedImg = loadData(imgKey, null);
      const img = document.createElement("img");
      if (savedImg) img.src = savedImg;

      const imgInput = document.createElement("input");
      imgInput.type = "file";
      imgInput.accept = "image/*";
      imgInput.addEventListener("change", e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          saveData(imgKey, reader.result);
          renderList();
        };
        reader.readAsDataURL(file);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "写真を削除";
      deleteBtn.className = "delete-photo";
      deleteBtn.addEventListener("click", () => {
        localStorage.removeItem(imgKey);
        renderList();
      });

      details.appendChild(memo);
      details.appendChild(link);
      details.appendChild(document.createElement("br"));
      if (savedImg) {
        details.appendChild(img);
        details.appendChild(deleteBtn);
      }
      details.appendChild(imgInput);

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(details);
      list.appendChild(li);
    }
  });
}

buildingSelect.addEventListener("change", renderList);
floorSelect.addEventListener("change", renderList);

renderList();

const shops = [
  { name: "とんかつ浜勝", building: "くうてん", floor: "10F" },
  { name: "五穀", building: "くうてん", floor: "10F" },
  { name: "一蘭", building: "アミュプラザ博多", floor: "B1F" },
  { name: "ラーメン海鳴", building: "アミュプラザ博多", floor: "10F" },
  { name: "すしざんまい", building: "博多阪急", floor: "B1F" },
  { name: "資さんうどん", building: "KITTE", floor: "B1F" }, // 仮に表示。不要なら削除
  { name: "だるま", building: "マルイ", floor: "2F" },
  // ...必要に応じてさらに店舗を追加
];

const list = document.getElementById("shopList");
const buildingFilter = document.getElementById("buildingFilter");
const floorFilter = document.getElementById("floorFilter");

function loadVisited() {
  return JSON.parse(localStorage.getItem("visitedShops") || "{}");
}

function saveVisited(data) {
  localStorage.setItem("visitedShops", JSON.stringify(data));
}

function renderList() {
  const visited = loadVisited();
  list.innerHTML = "";

  shops.forEach((shop, index) => {
    if (
      (buildingFilter.value && buildingFilter.value !== shop.building) ||
      (floorFilter.value && floorFilter.value !== shop.floor)
    ) {
      return;
    }

    const li = document.createElement("li");
    li.className = visited[shop.name] ? "visited" : "";

    const title = document.createElement("div");
    title.className = "shop-title";
    title.innerText = `[${shop.floor}][${shop.building}] ${shop.name}`;
    title.onclick = () => {
      detail.style.display = detail.style.display === "none" ? "block" : "none";
    };

    const detail = document.createElement("div");
    detail.className = "shop-detail";
    detail.style.display = "none";

    const memo = document.createElement("textarea");
    memo.placeholder = "メモを入力";
    memo.value = visited[shop.name]?.memo || "";
    memo.onchange = () => {
      visited[shop.name] = visited[shop.name] || {};
      visited[shop.name].memo = memo.value;
      saveVisited(visited);
    };

    const link = document.createElement("a");
    link.href = `https://www.google.com/search?q=${encodeURIComponent(shop.name + " 博多")}`;
    link.target = "_blank";
    link.innerText = "Googleで検索";

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        visited[shop.name] = visited[shop.name] || {};
        visited[shop.name].photo = reader.result;
        saveVisited(visited);
        renderList();
      };
      reader.readAsDataURL(file);
    };

    const img = document.createElement("img");
    img.src = visited[shop.name]?.photo || "";
    img.alt = "";
    if (!img.src) img.style.display = "none";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "写真を削除";
    deleteBtn.onclick = () => {
      if (visited[shop.name]) {
        delete visited[shop.name].photo;
        saveVisited(visited);
        renderList();
      }
    };

    const toggleVisitBtn = document.createElement("button");
    toggleVisitBtn.innerText = visited[shop.name] ? "未訪問にする" : "訪問済みにする";
    toggleVisitBtn.onclick = () => {
      if (visited[shop.name]) {
        delete visited[shop.name];
      } else {
        visited[shop.name] = {};
      }
      saveVisited(visited);
      renderList();
    };

    detail.appendChild(memo);
    detail.appendChild(document.createElement("br"));
    detail.appendChild(link);
    detail.appendChild(document.createElement("br"));
    detail.appendChild(photoInput);
    detail.appendChild(img);
    detail.appendChild(deleteBtn);
    detail.appendChild(document.createElement("br"));
    detail.appendChild(toggleVisitBtn);

    li.appendChild(title);
    li.appendChild(detail);
    list.appendChild(li);
  });
}

buildingFilter.onchange = renderList;
floorFilter.onchange = renderList;
window.onload = renderList;

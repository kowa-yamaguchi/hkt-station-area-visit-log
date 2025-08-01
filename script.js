const stores = [
  { name: "天神ホルモン", building: "くうてん" },
  { name: "ひょうたん寿司", building: "くうてん" },
  { name: "一蘭", building: "アミュプラザ" },
  { name: "くうてんうどん", building: "くうてん" },
  { name: "博多もつ鍋やまや", building: "KITTE" },
  { name: "モスバーガー", building: "マルイ" },
  { name: "すけさんうどん", building: "削除対象" } // 後で削除予定
];

const storeList = document.getElementById("storeList");
const buildingFilter = document.getElementById("buildingFilter");

function saveVisited(name, visited) {
  const visitedStores = JSON.parse(localStorage.getItem("visitedStores") || "{}");
  visitedStores[name] = visited;
  localStorage.setItem("visitedStores", JSON.stringify(visitedStores));
}

function loadVisited() {
  return JSON.parse(localStorage.getItem("visitedStores") || "{}");
}

function renderStores() {
  storeList.innerHTML = "";
  const filter = buildingFilter.value;
  const visitedStores = loadVisited();

  stores.forEach(store => {
    if (filter !== "all" && store.building !== filter) return;

    const li = document.createElement("li");
    li.className = "store-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = visitedStores[store.name] || false;
    checkbox.addEventListener("change", () => {
      saveVisited(store.name, checkbox.checked);
      li.classList.toggle("visited", checkbox.checked);
    });

    const label = document.createElement("span");
    label.className = "store-name";
    label.textContent = `[${store.building}] ${store.name}`;

    if (checkbox.checked) {
      li.classList.add("visited");
    }

    li.appendChild(checkbox);
    li.appendChild(label);
    storeList.appendChild(li);
  });
}

buildingFilter.addEventListener("change", renderStores);
renderStores();

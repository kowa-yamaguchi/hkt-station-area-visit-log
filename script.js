const stores = [
  { name: "しらすくじら", building: "くうてん", genre: "和食" },
  { name: "うまや", building: "くうてん", genre: "居酒屋" },
  { name: "一風堂", building: "アミュプラザ博多", genre: "ラーメン" },
  { name: "やまや", building: "KITTE博多", genre: "定食" },
  { name: "すけさんうどん", building: "マルイ博多", genre: "うどん" },
  { name: "資さんうどん", building: "マルイ博多", genre: "うどん" },
  // ← このあと100店舗以上、順次追加予定
];

const storeList = document.getElementById("storeList");
const filter = document.getElementById("buildingFilter");

function loadVisited() {
  return JSON.parse(localStorage.getItem("visitedStores") || "{}");
}

function saveVisited(data) {
  localStorage.setItem("visitedStores", JSON.stringify(data));
}

function renderStores() {
  const visited = loadVisited();
  const selected = filter.value;
  storeList.innerHTML = "";

  stores.forEach((store, i) => {
    if (selected !== "all" && store.building !== selected) return;

    const li = document.createElement("li");
    li.className = "store-item";
    if (visited[store.name]) li.classList.add("visited");

    const header = document.createElement("div");
    header.className = "store-header";

    const name = document.createElement("div");
    name.className = "store-name";
    name.textContent = `【${store.building}】${store.name}`;
    header.appendChild(name);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!visited[store.name];
    checkbox.onchange = () => {
      visited[store.name] = checkbox.checked;
      saveVisited(visited);
      renderStores();
    };
    header.appendChild(checkbox);
    li.appendChild(header);

    const details = document.createElement("div");
    details.className = "store-details";

    const note = document.createElement("textarea");
    note.placeholder = "メモを入力...";
    note.value = localStorage.getItem(`note_${store.name}`) || "";
    note.oninput = () => {
      localStorage.setItem(`note_${store.name}`, note.value);
    };
    details.appendChild(note);

    const link = document.createElement("a");
    link.href = `https://www.google.com/search?q=${encodeURIComponent(store.name + " 博多")}`;
    link.textContent = "Googleで検索";
    link.target = "_blank";
    link.style.display = "block";
    link.style.marginTop = "0.5em";
    details.appendChild(link);

    const photo = document.createElement("input");
    photo.type = "file";
    photo.accept = "image/*";
    photo.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(`img_${store.name}`, reader.result);
        renderStores();
      };
      reader.readAsDataURL(file);
    };
    details.appendChild(photo);

    const savedImage = localStorage.getItem(`img_${store.name}`);
    if (savedImage) {
      const img = document.createElement("img");
      img.src = savedImage;
      details.appendChild(img);

      const delBtn = document.createElement("button");
      delBtn.textContent = "写真を削除";
      delBtn.onclick = () => {
        localStorage.removeItem(`img_${store.name}`);
        renderStores();
      };
      details.appendChild(delBtn);
    }

    name.onclick = () => {
      details.style.display = details.style.display === "block" ? "none" : "block";
    };

    li.appendChild(details);
    storeList.appendChild(li);
  });
}

filter.onchange = renderStores;
renderStores();

const stores = [
  { name: "天神ホルモン", building: "くうてん" },
  { name: "ひょうたん寿司", building: "くうてん" },
  { name: "一蘭", building: "アミュプラザ" },
  { name: "くうてんうどん", building: "くうてん" },
  { name: "博多もつ鍋やまや", building: "KITTE" },
  { name: "モスバーガー", building: "マルイ" }
];

const storeList = document.getElementById("storeList");
const buildingFilter = document.getElementById("buildingFilter");

function saveVisited(name, visited) {
  const visitedStores = JSON.parse(localStorage.getItem("visitedStores") || "{}");
  visitedStores[name] = visited;
  localStorage.setItem("visitedStores", JSON.stringify(visitedStores));
}

function saveMemo(name, text) {
  const memos = JSON.parse(localStorage.getItem("memos") || "{}");
  memos[name] = text;
  localStorage.setItem("memos", JSON.stringify(memos));
}

function savePhoto(name, dataURL) {
  const photos = JSON.parse(localStorage.getItem("photos") || "{}");
  photos[name] = dataURL;
  localStorage.setItem("photos", JSON.stringify(photos));
}

function deletePhoto(name) {
  const photos = JSON.parse(localStorage.getItem("photos") || "{}");
  delete photos[name];
  localStorage.setItem("photos", JSON.stringify(photos));
}

function renderStores() {
  storeList.innerHTML = "";
  const filter = buildingFilter.value;
  const visitedStores = JSON.parse(localStorage.getItem("visitedStores") || "{}");
  const memos = JSON.parse(localStorage.getItem("memos") || "{}");
  const photos = JSON.parse(localStorage.getItem("photos") || "{}");

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
    label.addEventListener("click", () => {
      details.hidden = !details.hidden;
    });

    if (checkbox.checked) {
      li.classList.add("visited");
    }

    const details = document.createElement("div");
    details.className = "details";
    details.hidden = true;

    // メモ
    const memo = document.createElement("textarea");
    memo.className = "memo";
    memo.placeholder = "メモを入力...";
    memo.value = memos[store.name] || "";
    memo.addEventListener("input", () => {
      saveMemo(store.name, memo.value);
    });

    // 写真
    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const dataURL = event.target.result;
          photoPreview.src = dataURL;
          photoPreview.style.display = "block";
          deleteBtn.style.display = "inline-block";
          savePhoto(store.name, dataURL);
        };
        reader.readAsDataURL(file);
      }
    });

    const photoPreview = document.createElement("img");
    photoPreview.className = "photo-preview";
    if (photos[store.name]) {
      photoPreview.src = photos[store.name];
    } else {
      photoPreview.style.display = "none";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "写真削除";
    deleteBtn.className = "delete-photo";
    if (!photos[store.name]) deleteBtn.style.display = "none";
    deleteBtn.addEventListener("click", () => {
      deletePhoto(store.name);
      photoPreview.style.display = "none";
      deleteBtn.style.display = "none";
    });

    // Google検索リンク
    const searchLink = document.createElement("a");
    searchLink.href = `https://www.google.com/search?q=${encodeURIComponent(store.name + " 博多")}`;
    searchLink.target = "_blank";
    searchLink.textContent = "Googleで検索";

    details.appendChild(memo);
    details.appendChild(photoInput);
    details.appendChild(photoPreview);
    details.appendChild(deleteBtn);
    details.appendChild(document.createElement("br"));
    details.appendChild(searchLink);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(details);
    storeList.appendChild(li);
  });
}

buildingFilter.addEventListener("change", renderStores);
renderStores();

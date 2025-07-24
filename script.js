const stores = [
  "博多もつ鍋おおやま",
  "うなぎ 徳",
  "寿司 鮨割烹やま中",
  "焼肉チャンピオン",
  "もつ鍋 一藤",
  "牛たん炭焼 利久",
  "海鮮丼・寿司 ごっつお",
  "天ぷらひらお",
  "とんかつ濱かつ",
  "鶏三和",
  "鯛茶漬け もと村",
  "ピエトロ",
  "スープストックトーキョー",
  "資さんうどん",
  "博多やりうどん",
  "長浜ラーメン",
  "一風堂",
  "担々麺しびから",
  "はかた地どり",
  "韓美膳",
  "中華料理 杏仁荘",
  "インドカレー ガンディ",
  "イタリアン マンマミーア",
  "フレンチ KAZU",
  "パスタ パスタ",
  "カフェオットー",
  "星乃珈琲店",
  "タリーズコーヒー",
  "スターバックス",
  "デザート王国",
  "クリスピー・クリーム・ドーナツ",
  "ゴディバ",
  "パフェ専門店",
  "ミスド",
  "パンケーキgram",
  "ハードロックカフェ",
  "ビアホール BEER STAND",
  "和食まほろば",
  "牛カツ京都勝牛",
  "タコスバー"
];

const visited = JSON.parse(localStorage.getItem("visitedStores") || "[]");

function renderList() {
  const list = document.getElementById("store-list");
  list.innerHTML = "";
  stores.forEach((name, index) => {
    const li = document.createElement("li");
    li.textContent = name;
    if (visited.includes(index)) {
      li.classList.add("visited");
    }
    li.onclick = () => {
      if (visited.includes(index)) {
        visited.splice(visited.indexOf(index), 1);
      } else {
        visited.push(index);
      }
      localStorage.setItem("visitedStores", JSON.stringify(visited));
      renderList();
    };
    list.appendChild(li);
  });
}

renderList();

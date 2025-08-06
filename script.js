const restaurants = [
  { place: "AMU HAKATA", floor: "B1", genre: "スイーツ", name: "大名ソフトクリーム" },
  { place: "AMU HAKATA", floor: "B1", genre: "", name: "ウィズグリーン" },
  { place: "AMU HAKATA", floor: "B1", genre: "", name: "スープストックトーキョー" },
  { place: "AMU HAKATA", floor: "B1", genre: "カフェ", name: "シナボン・シアトルズベストコーヒー" },
  { place: "AMU HAKATA", floor: "B1", genre: "カフェ", name: "DEAN & DELUCA" },
  { place: "AMU HAKATA", floor: "B1", genre: "カフェ", name: "みのりカフェ" },
  { place: "AMU HAKATA", floor: "B1", genre: "カフェ", name: "プロント" },
  { place: "AMU HAKATA", floor: "B1", genre: "カフェ", name: "春水堂" },
  { place: "AMU HAKATA", floor: "1", genre: "スイーツ", name: "ア・ラ・カンパーニュ" },
  { place: "AMU HAKATA", floor: "5", genre: "カフェ", name: "パン屋むつか堂カフェ" },
  { place: "AMU HAKATA", floor: "6", genre: "カフェ", name: "アフタヌーンティー・ティールーム" },
  { place: "くうてん", floor: "9", genre: "鉄板焼", name: "鉄板焼　天　博多" },
  { place: "くうてん", floor: "9", genre: "牛たん", name: "牛たん炭焼　利久" },
  { place: "くうてん", floor: "9", genre: "串揚げ", name: "東京恵比寿　串亭" },
  { place: "くうてん", floor: "9", genre: "とんかつ", name: "鹿児島　黒かつ亭" },
  { place: "くうてん", floor: "9", genre: "うなぎ", name: "うなぎ　徳" },
  { place: "くうてん", floor: "9", genre: "カフェ", name: "抹茶カフェ　ハチ" },
  { place: "くうてん", floor: "9", genre: "カフェ", name: "カフェ　オーバカナル" },
  { place: "くうてん", floor: "9", genre: "和食", name: "加賀屋" },
  { place: "くうてん", floor: "9", genre: "中華", name: "華都飯店" },
  { place: "くうてん", floor: "9", genre: "めんたいこ", name: "めんたい料理　博多　椒房庵" },
  { place: "くうてん", floor: "9", genre: "ハンバーグ", name: "グリル大宮" },
  { place: "くうてん", floor: "9", genre: "寿司", name: "鮨割烹やま中" },
  { place: "くうてん", floor: "9", genre: "天ぷら", name: "銀座　天一" },
  { place: "くうてん", floor: "9", genre: "すき焼", name: "人形町今半" },
  { place: "くうてん", floor: "9", genre: "ピザ", name: "イゾラ　博多" },
  { place: "くうてん", floor: "9", genre: "スイーツ", name: "キャンベル・アーリー" },
  { place: "くうてん", floor: "9", genre: "パスタ", name: "37 PASTA" },
  { place: "くうてん", floor: "9", genre: "蕎麦", name: "石臼挽きそば　石月" },
  { place: "くうてん", floor: "9", genre: "鶏料理", name: "かしわ屋源次郎" },
  { place: "くうてん", floor: "9", genre: "海鮮", name: "喜水亭　和樂" },
  { place: "くうてん", floor: "9", genre: "点心", name: "鼎泰豊" },
  { place: "くうてん", floor: "9", genre: "フレンチ", name: "メルヴェイユ博多" },
  { place: "くうてん", floor: "9", genre: "バー", name: "MYMON 一木庵" },
  { place: "くうてん", floor: "10", genre: "もつ鍋", name: "笑楽" },
  { place: "くうてん", floor: "10", genre: "焼鳥", name: "うまや" },
  { place: "くうてん", floor: "10", genre: "鶏料理", name: "もも焼き　伴鳥" },
  { place: "くうてん", floor: "10", genre: "海鮮", name: "トクトク" },
  { place: "くうてん", floor: "10", genre: "ラーメン", name: "一風堂" },
  { place: "くうてん", floor: "10", genre: "ひつまぶし", name: "和牛　西豊舎" },
  { place: "くうてん", floor: "10", genre: "お好み焼き", name: "清十郎" },
  { place: "くうてん", floor: "10", genre: "中華", name: "四川飯店" },
  { place: "くうてん", floor: "10", genre: "カフェ", name: "おさるのジョージ　キッチン" },
  { place: "くうてん", floor: "10", genre: "しゃぶしゃぶ", name: "西新　初喜" },
  { place: "くうてん", floor: "10", genre: "焼肉", name: "チャンピオン" },
  { place: "くうてん", floor: "10", genre: "ベトナム", name: "ロータスパレス" },
  { place: "くうてん", floor: "10", genre: "スペイン", name: "ラ・ボデガ" },
  { place: "くうてん", floor: "10", genre: "ステーキ", name: "ぶどうの樹" },
  { place: "くうてん", floor: "10", genre: "野菜", name: "ミスターアンドミセスグリーン" },
  { place: "くうてん", floor: "10", genre: "水炊き", name: "濵田屋" },
  { place: "くうてん", floor: "10", genre: "うどん", name: "わっぱち" },
  { place: "くうてん", floor: "10", genre: "海鮮", name: "レカイエ　オイスターバー" },
  { place: "くうてん", floor: "10", genre: "餃子", name: "博多鉄なべ　無限餃子" },
  { place: "くうてん", floor: "10", genre: "メキシコ", name: "カンティーナ　エルボラーチョ" },
  { place: "くうてん", floor: "10", genre: "韓国", name: "バリトン" },
  { place: "くうてん", floor: "10", genre: "ワイン", name: "博多ワイン醸造所　竹乃屋" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "もつ鍋", name: "おおやま亭" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "居酒屋", name: "長浜鮮魚卸直営店　炉端　魚助" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "居酒屋", name: "立ち飲み酒場　よかたい" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "居酒屋", name: "もつやき処い志井" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "居酒屋", name: "ポン介" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "焼鳥", name: "焼鳥司" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "居酒屋", name: "博多さかなや食堂　辰悦丸" },
  { place: "DEITOS博多ほろよい通り", floor: "1", genre: "バル", name: "ニューコマツ" },
  { place: "DEITOS", floor: "B1", genre: "居酒屋", name: "まるとく食堂" },
  { place: "DEITOS", floor: "B1", genre: "ラーメン", name: "淡麗らぁ麺 明鏡志水" },
  { place: "DEITOS", floor: "B1", genre: "中華", name: "餃子食堂 宝雲亭" },
  { place: "DEITOS", floor: "B1", genre: "茶漬け", name: "こめらく" },
  { place: "DEITOS", floor: "B1", genre: "カレー", name: "印度カレー" },
  { place: "DEITOS", floor: "B1", genre: "鶏料理", name: "鶏匠 松元" },
  { place: "DEITOS", floor: "B1", genre: "ハンバーグ", name: "陶板焼き ハンバーグ俵屋" },
  { place: "DEITOS", floor: "B1", genre: "とんかつ", name: "濵かつ" },
  { place: "DEITOS", floor: "B1", genre: "パスタ", name: "フェリーチェバジル" },
  { place: "DEITOS", floor: "B1", genre: "カフェ", name: "ナナズグリーンティー" },
  { place: "DEITOS", floor: "B1", genre: "韓国", name: "HIRAKU" },
  { place: "DEITOS", floor: "B1", genre: "蕎麦", name: "おらが蕎麦" },
  { place: "DEITOS", floor: "B1", genre: "鯛めし", name: "石蔵" },
  { place: "DEITOS", floor: "B1", genre: "うどん", name: "因幡うどん" },
  { place: "DEITOS", floor: "B1", genre: "海鮮", name: "海鮮丼　日の出" },
  { place: "DEITOS", floor: "B1", genre: "牛たん", name: "利久" },
  { place: "DEITOS", floor: "B1", genre: "居酒屋", name: "竹乃屋" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "元祖博多だるま" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "らーめん二男坊" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "博多川端どさんこ" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "名島亭" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "長浜ナンバーワン" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "モヒカンらーめん" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "博多一幸舎" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "麺や　兼虎" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "博多辛麺　狛虎" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "らーめん海鳴" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "Shin-Shin" },
  { place: "DEITOS博多めん街道", floor: "2", genre: "ラーメン", name: "博多醤油ラーメン　月や" },
  { place: "DEITOS ANNEX", floor: "1", genre: "パブ", name: "HUB" },
  { place: "DEITOS ANNEX", floor: "1", genre: "ラーメン", name: "幸ちゃんラーメン" },
  { place: "DEITOS ANNEX", floor: "1", genre: "博多料理", name: "喜水丸" },
  { place: "DEITOS ANNEX", floor: "1", genre: "寿司", name: "すし割烹かじ" },
  { place: "DEITOS ANNEX", floor: "1", genre: "バー", name: "フクオカクラフトブリューイング　ウィズ　コマツ" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "牛たん", name: "博多　たんか" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "海鮮", name: "うお助" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "鶏料理", name: "ヒナタノ蔵" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "焼肉", name: "肉焼ベンジャミン" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "餃子", name: "ヤオマン" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "うどん", name: "二○加屋長介" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "焼鳥", name: "八兵衛" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "串揚げ", name: "しらすくじら" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "もつ鍋", name: "一慶" },
  { place: "駅から三百歩横丁", floor: "B1", genre: "ピザ", name: "ガエターノ" },
  { place: "JRJP博多ビル", floor: "1", genre: "いか", name: "河太郎" },
  { place: "JRJP博多ビル", floor: "2", genre: "フレンチ", name: "俺のフレンチ" },
  { place: "JRJP博多ビル", floor: "2", genre: "寿司", name: "すしや　コトブキ" },
  { place: "JRJP博多ビル", floor: "2", genre: "", name: "博多ワイン醸造所　竹乃屋" },
  { place: "KITTE博多", floor: "9", genre: "とんかつ", name: "新宿さぼてん" },
  { place: "KITTE博多", floor: "9", genre: "もつ鍋", name: "おおやま" },
  { place: "KITTE博多", floor: "9", genre: "オムライス", name: "ポムの樹" },
  { place: "KITTE博多", floor: "9", genre: "ハンバーグ", name: "ハンバーグ2910" },
  { place: "KITTE博多", floor: "9", genre: "お好み焼き", name: "こて吉" },
  { place: "KITTE博多", floor: "9", genre: "どんぶり", name: "マルモキッチン" },
  { place: "KITTE博多", floor: "9", genre: "和食", name: "喜水丸" },
  { place: "KITTE博多", floor: "9", genre: "沖縄", name: "あだん" },
  { place: "KITTE博多", floor: "9", genre: "カフェ", name: "kawara CAFE&DINING" },
  { place: "KITTE博多", floor: "9", genre: "ビール", name: "銀座ライオン" },
  { place: "KITTE博多", floor: "9", genre: "水炊き", name: "華味鳥" },
  { place: "KITTE博多", floor: "9", genre: "ドリア", name: "チーズ&ドリア.スイーツ" },
  { place: "KITTE博多", floor: "9", genre: "定食", name: "おぼんdeごはん" },
  { place: "KITTE博多", floor: "9", genre: "イタリアン", name: "TANTO TANTO" },
  { place: "KITTE博多", floor: "10", genre: "カフェ", name: "星乃珈琲店" },
  { place: "KITTE博多", floor: "10", genre: "串揚げ", name: "串家物語" },
  { place: "KITTE博多", floor: "10", genre: "シュラスコ", name: "ALEGRIA" },
  { place: "KITTE博多", floor: "10", genre: "しゃぶしゃぶ", name: "但馬屋" },
  { place: "KITTE博多", floor: "10", genre: "牛たん", name: "仙台辺見" },
  { place: "KITTE博多", floor: "10", genre: "あか牛", name: "yoka-yoka" },
  { place: "KITTE博多", floor: "10", genre: "天ぷら", name: "えびのや" },
  { place: "KITTE博多", floor: "10", genre: "蕎麦", name: "華元 本膳庵" },
  { place: "KITTE博多", floor: "10", genre: "焼鳥", name: "餃子1010" },
  { place: "KITTE博多", floor: "10", genre: "中華", name: "京鼎樓" },
  { place: "KITTE博多", floor: "10", genre: "イタリアン", name: "PREMIO ピエトロ" },
  { place: "KITTE博多", floor: "10", genre: "韓国", name: "bibim" },
  { place: "KITTE博多", floor: "10", genre: "寿司", name: "鮨やハレの日" },
  { place: "KITTE博多", floor: "10", genre: "焼肉", name: "叙々苑" },
  { place: "KITTE博多", floor: "B1", genre: "韓国", name: "コッキオ" },
  { place: "KITTE博多", floor: "B1", genre: "海鮮", name: "喜水丸" },
  { place: "KITTE博多", floor: "B1", genre: "和食", name: "はかた天乃" },
  { place: "KITTE博多", floor: "B1", genre: "串カツ", name: "串カツ田中" },
  { place: "KITTE博多", floor: "B1", genre: "もつ鍋", name: "モツ酒場楽天地" },
  { place: "KITTE博多", floor: "B1", genre: "タイ", name: "ガムランディー" },
  { place: "KITTE博多", floor: "B1", genre: "居酒屋", name: "博多酒場ヨカタイ" },
  { place: "KITTE博多", floor: "B1", genre: "ラーメン", name: "Shin-Shin" },
  { place: "KITTE博多", floor: "B1", genre: "焼鳥", name: "とりかわ大臣" },
  { place: "KITTE博多", floor: "B1", genre: "餃子", name: "テムジン" },
  { place: "KITTE博多", floor: "B1", genre: "鶏そば", name: "TORIDEN" },
  { place: "KITTE博多", floor: "B1", genre: "もつ", name: "モツビストロ天神ホルモン" },
  { place: "KITTE博多", floor: "B1", genre: "もつ鍋", name: "おおやま" },
  { place: "KITTE博多", floor: "B1", genre: "寿司", name: "すし酒場さしす" },
  { place: "KITTE博多", floor: "B1", genre: "ちゃんぽん", name: "リンガーハット" },
  { place: "KITTE博多", floor: "B1", genre: "スイーツ", name: "デリスタルト&カフェ" },
  { place: "KITTE博多", floor: "B1", genre: "中華", name: "粥餐庁" },
  { place: "KITTE博多", floor: "B1", genre: "イタリアン", name: "Di PUNTO" },
  { place: "博多駅地下街", floor: "", genre: "ハンバーグ", name: "極味や" },
  { place: "博多駅地下街", floor: "", genre: "お好み焼き", name: "きんさい屋" },
  { place: "博多駅地下街", floor: "", genre: "アジフライ", name: "三陽食堂" },
  { place: "博多駅地下街", floor: "", genre: "焼鳥", name: "とりかわ長政" },
  { place: "博多駅地下街", floor: "", genre: "ラーメン", name: "名代ラーメン亭" },
  { place: "博多駅地下街", floor: "", genre: "餃子", name: "弐ノ弐" },
  { place: "博多駅地下街", floor: "", genre: "ラーメン", name: "ラーメン博魂" },
  { place: "博多駅地下街", floor: "", genre: "寿司", name: "羽田市場" },
  { place: "博多駅地下街", floor: "", genre: "ワイン", name: "博多レターレ" },
  { place: "博多駅地下街", floor: "", genre: "カフェ", name: "PRONTO" },
  { place: "博多バスターミナル", floor: "8", genre: "お好み焼き", name: "ふきや" },
  { place: "博多バスターミナル", floor: "B1", genre: "うどん", name: "牧のうどん" },
  { place: "博多バスターミナル", floor: "8", genre: "焼肉", name: "牛太本陣" },
  { place: "博多バスターミナル", floor: "8", genre: "焼鳥", name: "竹乃屋" },
  { place: "博多バスターミナル", floor: "B1", genre: "手羽先", name: "世界の山ちゃん" },
  { place: "博多バスターミナル", floor: "8", genre: "定食", name: "ぎおん亭" },
  { place: "博多バスターミナル", floor: "1", genre: "焼肉", name: "極味や" },
  { place: "博多バスターミナル", floor: "B1", genre: "カフェ", name: "バンカム" },
  { place: "博多バスターミナル", floor: "8", genre: "焼肉", name: "博多スタミナ辛みそ鉄板焼肉竹ちゃん亭" },
  { place: "博多バスターミナル", floor: "1", genre: "もつ", name: "天神ホルモン" },
  { place: "博多バスターミナル", floor: "1", genre: "もつ鍋", name: "田しゅう" },
  { place: "博多バスターミナル", floor: "8", genre: "パスタ", name: "パンチョ" },
  { place: "博多バスターミナル", floor: "8", genre: "カレー", name: "ゴーゴーカレー" },
  { place: "博多バスターミナル", floor: "8", genre: "ラーメン", name: "横浜家系ラーメン　角蔵家" },
  { place: "博多バスターミナル", floor: "8", genre: "角打ち", name: "しらすくじら" },
  { place: "博多バスターミナル", floor: "8", genre: "お好み焼き", name: "優乃華" },
  { place: "博多バスターミナル", floor: "8", genre: "", name: "肉と魚　博多ゆめはな" },
  { place: "博多バスターミナル", floor: "8", genre: "焼きそば", name: "バソキ屋" }
];

function populateFilters() {
  const placeSet = new Set();
  const floorSet = new Set();
  const genreSet = new Set();

  restaurants.forEach(r => {
    if (r.place) placeSet.add(r.place);
    if (r.floor) floorSet.add(r.floor);
    if (r.genre) genreSet.add(r.genre);
  });

  addOptions("placeFilter", [...placeSet].sort());
  addOptions("floorFilter", [...floorSet].sort());
  addOptions("genreFilter", [...genreSet].sort());
}

function addOptions(selectId, options) {
  const select = document.getElementById(selectId);
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

function createRestaurantElement(r) {
  const li = document.createElement("li");
  li.className = "restaurant";
  li.innerHTML = `
    <h3>${r.name}</h3>
    <p>場所: ${r.place} ／ 階: ${r.floor} ／ ジャンル: ${r.genre || "未分類"}</p>
  `;
  li.addEventListener("click", () => {
    li.classList.toggle("visited");
    saveVisited(r.name, li.classList.contains("visited"));
  });

  // 初期状態に反映
  if (getVisited(r.name)) {
    li.classList.add("visited");
  }

  return li;
}

function displayRestaurants() {
  const list = document.getElementById("restaurantList");
  list.innerHTML = "";

  const selectedPlace = document.getElementById("placeFilter").value;
  const selectedFloor = document.getElementById("floorFilter").value;
  const selectedGenre = document.getElementById("genreFilter").value;

  restaurants
    .filter(r =>
      (!selectedPlace || r.place === selectedPlace) &&
      (!selectedFloor || r.floor === selectedFloor) &&
      (!selectedGenre || r.genre === selectedGenre)
    )
    .forEach(r => {
      list.appendChild(createRestaurantElement(r));
    });
}

function saveVisited(name, visited) {
  const visitedData = JSON.parse(localStorage.getItem("visitedStores") || "{}");
  visitedData[name] = visited;
  localStorage.setItem("visitedStores", JSON.stringify(visitedData));
}

function getVisited(name) {
  const visitedData = JSON.parse(localStorage.getItem("visitedStores") || "{}");
  return visitedData[name];
}

document.getElementById("placeFilter").addEventListener("change", displayRestaurants);
document.getElementById("floorFilter").addEventListener("change", displayRestaurants);
document.getElementById("genreFilter").addEventListener("change", displayRestaurants);

populateFilters();
displayRestaurants();
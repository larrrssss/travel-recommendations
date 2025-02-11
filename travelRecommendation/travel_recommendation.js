const searchInput = document.getElementById("search");
const clearButton = document.getElementById("clear-btn");
const searchButton = document.getElementById("search-btn");
const recommendationsContainer = document.getElementById("recommendations");

let data;

searchButton.addEventListener("click", () => {
  const value = searchInput.value.trim().toLowerCase().split(",").join("");

  const keywords = {
    beaches: ["beach", "beaches"],
    temples: ["temple", "temples"],
    countries: ["country", "countries"],
  };

  let matchedCategory;
  for (key in keywords) {
    if (keywords[key].includes(value)) {
      matchedCategory = key;
      break;
    }
  }

  if (!matchedCategory) return;

  const cities =
    matchedCategory === "countries"
      ? data[matchedCategory][getRandom(0, 3)].cities
      : data[matchedCategory];

  recommendationsContainer.innerHTML = "";

  for (const city of cities) {
    const div = document.createElement("div");
    div.classList.add("city");

    const img = document.createElement("img");
    img.src = city.imageUrl;

    const h3 = document.createElement("h3");
    h3.innerText = city.name;

    const p = document.createElement("p");
    p.innerText = city.description;

    const btn = document.createElement("button");
    btn.innerText = "Visit";

    div.append(img);
    div.append(h3);
    div.append(p);
    div.append(btn);

    recommendationsContainer.append(div);
  }
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  recommendationsContainer.innerHTML = "";
});

function loadData() {
  fetch("/travelRecommendation/travel_recommendation_api.json")
    .then((response) => response.json())
    .then((json) => (data = json));
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

loadData();

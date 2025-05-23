const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const dropdown = document.getElementById("searchDropdown");
const resultBox = document.getElementById("searchResults");
const closeBtn = document.getElementById("closeBtn");

const clearSearch = () => {
  searchInput.value = "";
  dropdown.style.display = "none";
};

clearBtn.onclick = clearSearch;
closeBtn.onclick = clearSearch;

const showResult = (title, img, desc) => {
  resultBox.innerHTML = `
    <h3 class="title">${title}</h3>
    <img src="${img}" alt="${title}" class="search-img" />
    <p class="description">${desc}</p>
  `;
  dropdown.style.display = "block";
};

const showNotFound = () => {
  resultBox.innerHTML = `<p class="notfound">No matching results found.</p>`;
  dropdown.style.display = "block";
};

searchBtn.onclick = () => {
  fetch("travel_recommendation_api.json")
    .then(res => res.json())
    .then(data => {
      const query = searchInput.value.trim().toLowerCase();
      let match = null;

      data.countries.some(country =>
        country.cities.some(city => {
          if (city.name.toLowerCase().includes(query)) {
            match = city;
            return true;
          }
        })
      );

      if (!match) {
        match = data.temples.find(t => t.name.toLowerCase().includes(query));
      }

      if (!match) {
        match = data.beaches.find(b => b.name.toLowerCase().includes(query));
      }

      match ? showResult(match.name, match.imageUrl, match.description) : showNotFound();
    });
};
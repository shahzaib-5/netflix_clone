const apiKey = "4ad64ef98ad23cf625357d223f9ba1e1";
const apiEndPoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

//object of api paths
const apiPath = {
  fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
  fetchMoviesList: (id) =>
    `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
};

function init() {
  fetchAllSections();
}

//function that fetch data according to categories
function fetchAllSections() {
  fetch(apiPath.fetchAllCategories)
    .then((res) => res.json())
    .then((res) => {
      const categories = res.genres;
      if (Array.isArray(categories) && categories.length) {
        categories.forEach((category) => {
          fetchAndBuild(apiPath.fetchMoviesList(category.id), category);
        });
      } else {
        console.log("unable to load Data");
      }
      // console.log(movies);
    })
    .catch((err) => console.log(err));
}

//function that fetch url of movies against each category
function fetchAndBuild(fetchUrl, category) {
  console.log(fetchUrl, category);
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      // console.table(res.results);
      const movies = res.results;
      if (Array.isArray(movies) && movies.length) {
        buildMovieSection(movies.slice(0, 6), category.name);
      } else {
        console.log("unable to load Data");
      }
    })
    .catch((err) => console.error(err));
}
//show images on web page
function buildMovieSection(list, categoryName) {
  console.log(list, categoryName);
  const moviesCont = document.getElementById("movies-cont");
  const moviesList = list.map((item) => {
    return `
    <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}"></img>
    `;
  });

  const moviesSectionHTML = `
 <h2 class="movie-section-heading">${categoryName}<span class="explore">Explore All</span></h2>
 <div class="movie-row">
 ${moviesList}
 </div>
`;

  const div = document.createElement("div");
  div.className = "movies-section";
  div.innerHTML = moviesSectionHTML;
  moviesCont.append(div);
}

//when app is loaded then call init function
window.addEventListener("load", function () {
  init();
});

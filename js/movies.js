// Initialize Firestore
initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);
const key = 'dc636aee';
let searchBtn = document.getElementById('searchBtn');
let listOfMovies = document.getElementById('list');


searchBtn.addEventListener('click', event => {
  event.preventDefault();
  let search = document.getElementById('searchInput').value;
  getMovies(key, search);
});

const drawInitialListOfMovies = () => {
  let listMovies = document.getElementById('list');
  let dbRef = db.collection('movies').orderBy('title', 'asc');
  dbRef.get()
    .then(list => {
      let movieInfo = '';
      list.forEach(movie => {
        let info = movie.data();
        movieInfo += `<div class="show-movie col-md-3 mt-2" onclick="showInfo('${info.imdbID}')">
        <div class="card">
                    <img class="card-img-top" src="${info.poster}">
                    <div class="card-body">
                      <h4 class="card-title">${info.title}</h4>
                      <p class="card-text">${info.year}.</p>
                      <p class="card-text">${info.type}</p>
                    </div>
                  </div>
                  </div>`;
      });
      listMovies.innerHTML = movieInfo;
    })
};

drawInitialListOfMovies();

const showInfo = (info) => {
  db.collection('movies').get()
    .then(list => {
      list.forEach(movie => {
        let movieInfo = movie.data();
        if (movieInfo.imdbID === info) {
          swal({
            titleText: `${movieInfo.title}`,
            text: `${movieInfo.year}`,
            imageUrl: `${movieInfo.poster}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: `${movieInfo.title}`,
            confirmButtonText: '¡Genial!',
            confirmButtonColor: '#FDCA49',
            animation: false
          });
        }
      })
    });
};

const drawSearch = (search) => {
  listOfMovies.innerHTML = '';
  let dbRef = db.collection('movies').orderBy('title', 'asc');
  dbRef.get()
    .then(list => {
      let movieInfo = '';
      list.forEach(movie => {
        let info = movie.data();
        let title = info.title;
        let titleToSearch = title.toUpperCase();
        let searchUpper = search.toUpperCase();
        let findSearch = titleToSearch.indexOf(searchUpper);
        if (findSearch !== -1) {
          movieInfo += `<div class="show-movie col-md-3 mt-2" onclick="showInfo('${info.imdbID}')">
        <div class="card">
                    <img class="card-img-top" src="${info.poster}">
                    <div class="card-body">
                      <h4 class="card-title">${info.title}</h4>
                      <p class="card-text">${info.year}.</p>
                      <p class="card-text">${info.type}</p>
                    </div>
                  </div>
                  </div>`;
        }
      });
      listOfMovies.innerHTML = movieInfo;
    });
};
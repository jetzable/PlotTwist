// Initialize Firestore
initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);

const key = 'dc636aee';
let search = 'all'

getMovies(key, search);

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
                      <p class="card-text">${info.imdbID}</p>
                    </div>
                  </div>
                  </div>`;
      });
      listMovies.innerHTML = movieInfo;
    })
};

drawInitialListOfMovies();
// Initialize Firestore
initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);

filterByType('movie');

const drawFilter = (array) => {
    let listMovies = document.getElementById('list');
      let movieInfo = '';
      array.forEach(movie => {
        movieInfo += `<div class="show-movie col-md-3 mt-2" onclick="showInfo('${movie.imdbID}')">
        <div class="card">
                    <img class="card-img-top" src="${movie.poster}">
                    <div class="card-body">
                      <h4 class="card-title">${movie.title}</h4>
                      <p class="card-text">${movie.year}.</p>
                      <p class="card-text">${movie.type}</p>
                      <p class="card-text">${movie.imdbID}</p>
                    </div>
                  </div>
                  </div>`;
      listMovies.innerHTML = movieInfo;
    });
};

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
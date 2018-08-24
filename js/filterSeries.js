// Initialize Firestore
initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);
const key = 'dc636aee';
let searchBtn = document.getElementById('searchBtn');
let listOfMovies = document.getElementById('list');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.providerData.forEach((profile) => {
      $(() => {
        $('[data-toggle="popover"]').popover({
          trigger: 'click',
          placement: 'top',
          html: true,
          _content: `<div class="card text-center my-2"><div class="card-header">
                        <h5 class="card-title">${profile.displayName}</h5></div>
                        <a><img class="card-img-top user-image my-3" src="${profile.photoURL}"></a><div class="card-body">
                        <h7 class="card-title"><p class="card-text">${profile.email}</p></h7>
                        </div></div></div>`,
          get content() {
            return this._content;
          },
          set content(value) {
            this._content = value;
          },
        });
      });
      const profileButton = document.getElementById('popover-button');
      const printProfileButton = `<i class="fas fa-user-circle"></i>`;
      profileButton.innerHTML += printProfileButton;
    });
  } else {
    location.href = ('login.html');
  }
});

filterByType('series');

searchBtn.addEventListener('click', event => {
  event.preventDefault();
  let search = document.getElementById('searchInput').value;
  getMovies(key, search);
});

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

const drawSearch = (search) => {
  listOfMovies.innerHTML = '';
  let dbRef = db.collection('movies').orderBy('title', 'asc');
  dbRef.get()
    .then(list => {
      let movieInfo = '';
      list.forEach(movie => {
        let type = movie.data().type;
        let info = movie.data();
        let title = info.title;
        let titleToSearch = title.toUpperCase();
        let searchUpper = search.toUpperCase();
        let findSearch = titleToSearch.indexOf(searchUpper);
        if (findSearch !== -1 && type === 'series') {
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

document.getElementById('log-out-btn').addEventListener('click', event => {
  event.preventDefault();
  signOutUser();
  alert('¡Hasta Pronto!');
  location.href = ('login.html');
});
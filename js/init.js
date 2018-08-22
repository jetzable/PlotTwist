// Initialize Firebase
window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyBV-ibNN9f3wWI1MJlEcS9tYY7G4mrZbf8",
    authDomain: "cinema-sin.firebaseapp.com",
    databaseURL: "https://cinema-sin.firebaseio.com",
    projectId: "cinema-sin",
    storageBucket: "cinema-sin.appspot.com",
    messagingSenderId: "383956476355"
  });
};

window.getMovies = (key, search) => {
  let url = ('http://www.omdbapi.com/?apikey=' + key + '&s=' + search);
  fetch(url)
    .then(response => response.json())
    .then((res) => {
      let searchResult = res.Search;
      db.collection('movies').get()
        .then(list => {
          let movieList = [];
          list.forEach(movie => {
            movieList.push(movie.data().imdbID);
          })
          searchResult.forEach(movie => {
            let checkMovieId = movieList.indexOf(movie.imdbID);
            if (checkMovieId === -1) {
              db.collection('movies').add({
                title: movie.Title,
                year: movie.Year,
                imdbID: movie.imdbID,
                type: movie.Type,
                poster: movie.Poster
              })
              .then(docRef => {
                console.log(docRef.id);
              })
            } else {
              console.log('La película ya existe en la base de datos');
            }
          })
        })
    });
};

window.filterByType = (search) => {
  let dbRef = db.collection('movies').orderBy('title', 'asc');
  dbRef.get()
  .then(list => {
    let searchByTypeArray = [];
    list.forEach(movie => {
      let movieInfo = movie.data();
      if(movieInfo.type === search){
        searchByTypeArray.push(movieInfo);
      }
    })
    drawFilter(searchByTypeArray);
    });
};
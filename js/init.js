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
    drawSearch(search);
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

// Google Sign-In //
window.googleUserLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = ('views/newsfeed.html');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
      // ...
    });
};


// Facebook sign-in //
window.facebookUserLogin = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = ('views/newsfeed.html');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
    });
};

// LogOut function //
window.signOutUser = () => {
  firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
};

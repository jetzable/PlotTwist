initializeFirebase();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    let displayName = user.displayName;
    let email = user.email;
    let emailVerified = user.emailVerified;
    let photoURL = user.photoURL;
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    let providerData = user.providerData;
    localStorage.setItem('name', 'displayName');
    location.href = ('movies.html');
  } else {
    // User is signOut.
  }
});

document.getElementById('google-sign-in').addEventListener('click', event => {
  event.preventDefault();
  googleUserLogin();
});

document.getElementById('facebook-sign-in').addEventListener('click', event => {
  event.preventDefault();
  facebookUserLogin();
});
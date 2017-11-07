import firebase from 'firebase'


const config = {
  apiKey: "AIzaSyDfN4b-sD5sv2wsPIjwpWomrIVGobHayis",
  authDomain: "node-cloud-platform.firebaseapp.com",
  databaseURL: "https://node-cloud-platform.firebaseio.com",
  projectId: "node-cloud-platform",
  storageBucket: "node-cloud-platform.appspot.com",
  messagingSenderId: "503124842498"
};

firebase.initializeApp(config)

let facebook = new firebase.auth.FacebookAuthProvider()
facebook.addScope('public_profile')

let google = new firebase.auth.GoogleAuthProvider()

export default {
  google, facebook
}
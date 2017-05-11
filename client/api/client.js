import firebase from 'firebase';

const USERS_PATH = '/users';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: 'ashoka-social-api.firebaseapp.com',
  databaseURL: 'https://ashoka-social-api.firebaseio.com',
  projectId: 'ashoka-social-api',
  storageBucket: 'ashoka-social-api.appspot.com',
  messagingSenderId: '374901402447'
};

class apiClient {
  static initialize = () => {
    firebase.initializeApp(config);
    return this;
  }

  static authenticated = (callback) => {
    return firebase.auth().onAuthStateChanged(callback);
  }

  static login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static logout = (callback) => {
    return firebase.auth().logout(callback);
  }

  static createUser = (userDetails) => {
    const ref = firebase.database().ref();
    const key = ref.push().key;
    const data = {};
    data[`${USERS_PATH}/${key}`] = userDetails;
    return ref.update(data).then(() => (key));
  }
}

export default apiClient;

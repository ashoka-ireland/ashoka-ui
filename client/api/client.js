import firebase from 'firebase/app';
import { omitBy, isUndefined } from 'lodash';
import 'firebase/auth';
import 'firebase/database';

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
  constructor() {
    firebase.initializeApp(config);
  }

  authenticated = (callback) => {
    return firebase.auth().onAuthStateChanged(callback);
  }

  login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout = () => {
    return firebase.auth().signOut();
  }

  requestPasswordReset = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  createUser = (userDetails) => {
    const ref = firebase.database().ref();
    const userId = ref.push().key;
    const filteredKeys = omitBy(userDetails, isUndefined);

    const data = {};
    // Specify individual paths here so we don't do a full overwrite
    Object.keys(filteredKeys).forEach((key) => {
      data[`${USERS_PATH}/${userId}/${key}`] = filteredKeys[key];
    });
    return ref.update(data).then(() => (userId));
  }

  getUser = (userId) => {
    const ref = firebase.database().ref(`${USERS_PATH}/${userId}`);
    return ref.once('value').then(response => ({ response: response.val() }));
  }

  listUsers = (cursor = null, limit = 10) => {
    const ref = firebase.database().ref(USERS_PATH);
    return ref.orderByChild('firstName')
      .startAt(cursor)
      .limitToFirst(limit)
      .once('value')
      .then(response => ({ response: response.val() }));
  }
}

const client = new apiClient();

export default client;

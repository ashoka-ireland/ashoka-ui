import firebase from 'firebase/app';
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

  login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  createUser = (userDetails) => {
    const ref = firebase.database().ref();
    const key = ref.push().key;
    const data = {};
    data[`${USERS_PATH}/${key}`] = userDetails;
    return ref.update(data).then(() => (key));
  }

  listUsers = (cursor = null, limit = 10) => {
    const ref = firebase.database().ref(USERS_PATH);
    return ref.orderByChild('userName')
      .startAt(cursor)
      .limitToFirst(limit)
      .once('value')
      .then(response => ({ response: response.val() }));
  }
}

const client = new apiClient();
export default client;

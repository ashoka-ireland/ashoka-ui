import * as firebase from 'firebase';

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
    return firebase.initializeApp(config);
  }

  static login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
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

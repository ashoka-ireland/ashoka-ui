import firebase from 'firebase/app';
import { omitBy, isUndefined, lowerCase, forEach } from 'lodash';
import * as constants from './constants';
import 'firebase/auth';
import 'firebase/database';

const SURVEYS_PATH = '/surveys';
const NOMINEES_PATH = '/nominees';
const ORGANIZATIONS_PATH = '/organizations';

const config = {
  apiKey: 'AIzaSyCQnvhtra0swrYaGvwSFiavtkKwdwSQd6g',
  authDomain: 'ashoka-social-api.firebaseapp.com',
  databaseURL: 'https://ashoka-social-api.firebaseio.com',
  projectId: 'ashoka-social-api',
  storageBucket: 'ashoka-social-api.appspot.com',
  messagingSenderId: '374901402447'
};

const nomineeValues = (availableValues, nomineeId) => {
  const data = {};
  constants.NOMINEE_VALUES.forEach((value) => {
    data[`${NOMINEES_PATH}/${nomineeId}/${value}`] = availableValues[value];
  });
  data[`${NOMINEES_PATH}/${nomineeId}/id`] = nomineeId;
  data[`${NOMINEES_PATH}/${nomineeId}/sortName`] = lowerCase(
    `${availableValues.firstName} ${availableValues.lastName}`
  );
  return omitBy(data, isUndefined);
};

const surveyValues = (availableValues, nomineeId, profileId) => {
  const data = {};
  forEach(availableValues, (value, key) => {
    if (!constants.NOMINEE_VALUES.includes(key) && value) {
      data[`${SURVEYS_PATH}/${profileId}/${key}`] = value;
    }
  });
  data[`${SURVEYS_PATH}/${profileId}/nomineeId`] = nomineeId;
  return data;
};

const organizationValue = (organization, organizationId) => {
  const data = {};
  forEach(organization, (value, key) => {
    data[`${ORGANIZATIONS_PATH}/${organizationId}/${key}`] = value;
  });

  return data;
};

class apiClient {
  constructor() {
    firebase.initializeApp(config);
  }

  authenticated = (callback) => {
    return firebase.auth().onAuthStateChanged(callback);
  };

  login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  logout = () => {
    return firebase.auth().signOut();
  };

  requestPasswordReset = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  createNominee = (details) => {
    const ref = firebase.database().ref();
    let data;
    let nomineeId;
    if(details.hasOwnProperty('key')) {
      const { key, ...nomineeDetails } = details; // eslint-disable-line
      nomineeId = key;
      data = nomineeValues(nomineeDetails, nomineeId);
    } else {
      const profileId = ref.push().key;
      nomineeId = ref.push().key;
      data = {
        ...nomineeValues(details, nomineeId),
        ...surveyValues(details, nomineeId, profileId)
      };
    }
    return ref.update(data).then(() => (nomineeId));
  };

  getNominee = (nomineeId) => {
    const ref = firebase.database().ref(`${NOMINEES_PATH}/${nomineeId}`);
    return ref.once('value').then(response => ({ response: response.val() }));
  };

  listNominees = (cursor = null) => {
    const ref = firebase.database().ref(NOMINEES_PATH);
    return ref.orderByChild('firstName')
      .startAt(cursor)
      .once('value')
      .then(response => ({ response: response.val() }));
  };

  searchNominees = (query) => {
    const ref = firebase.database().ref(NOMINEES_PATH);

    if (!query) {
      return Promise.resolve({ response: [] });
    }

    return ref
      .orderByChild('sortName')
      .startAt(query)
      .endAt(`${query}\u{f8ff}`)
      .once('value')
      .then(response => ({ response: response.val() }));
  };

  createOrganization = (organization) => {
    const ref = firebase.database().ref();
    let data;

    if(!organization.hasOwnProperty('key')){
      const orgId = ref.push().key;
      data = organizationValue(organization, orgId);
    }else{
      const { key, ...orgDetails } = organization;
      data = organizationValue(orgDetails, key);
    }

    return ref.update(data).then(() => data.key);
  };

  getOrganization = (organizationId) => {
    const ref = firebase.database().ref(`${ORGANIZATIONS_PATH}/${organizationId}`);
    return ref.once('value').then(response => ({ response: response.val() }));
  };

  listOrganizations = (cursor = null) => {
    const ref = firebase.database().ref(ORGANIZATIONS_PATH);
    return ref.orderByChild('name')
      .startAt(cursor)
      .once('value')
      .then(response => ({ response: response.val() }));
  };

  searchOrganizations = (query) => {
    const ref = firebase.database().ref(ORGANIZATIONS_PATH);

    if (!query) {
      return Promise.resolve({ response: [] });
    }

    return ref
      .orderByChild('name')
      .startAt(query)
      .endAt(`${query}\u{f8ff}`)
      .once('value')
      .then(response => {
        console.log('Response for query', query, response.val());
        return ({ response: response.val() });
      });
  };
}

const client = new apiClient();

export default client;

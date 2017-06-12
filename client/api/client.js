import { omitBy, isUndefined, lowerCase, forEach, reduce } from 'lodash';
import firebase from 'firebase/app';
import Promise from 'bluebird';
import * as constants from './constants';
import 'firebase/auth';
import 'firebase/database';

const SURVEYS_PATH = '/surveys';
const SURVEY_MODEL_PATH = '/survey-model';
const NOMINEES_PATH = '/nominees';
const ORGANIZATIONS_PATH = '/organizations';
const NOMINEE_ORGANIZATIONS_PATH = '/nominee-organizations';

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
  data[`${NOMINEES_PATH}/${nomineeId}/draft`] = availableValues.draft || false;
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

  listSurveys = async () => {
    const ref = firebase.database().ref(SURVEYS_PATH);

    const [surveys, users] = await Promise.all([
      ref.once('value'),
      this.listNominees()
    ]);

    const usersList = users.response;
    const surveysList = surveys.val();

    if(!usersList) return {response: surveysList};

    const response = reduce(surveysList, (result, value, key) => {
      if(usersList.hasOwnProperty(value.nomineeId)){
        result[key] = {
          ...value,
          user: {...usersList[value.nomineeId]}
        };
      }
      return result;
    }, {});

    return {response};
  };

  searchSurveys = async (query) => {
    const usersMatching = await this.searchNominees(query);
    const users = usersMatching.response;
    const allSurveys = await this.listSurveys();
    const surveys = allSurveys.response;

    const response = reduce(surveys, (result, value, key) => {
      if(users.hasOwnProperty(value.nomineeId)){
        result[key] = { ...value };
      }
      return result;
    }, {});

    return {response};
  };

  saveSurvey = (nomineeId, survey) => {
    const ref = firebase.database().ref();
    let data;
    let profileId;
    if(survey.hasOwnProperty('key')) {
      const { key, ...surveyDetails } = survey; // eslint-disable-line
      profileId = key;
      data = surveyValues(surveyDetails, nomineeId, profileId);
    } else {
      profileId = ref.push().key;
      data = surveyValues(survey, nomineeId, profileId);
    }
    return ref.update(data).then(() => (profileId));
  }

  getProfile = async (profileId) => {
    const ref = firebase.database().ref(`${SURVEYS_PATH}/${profileId}`);
    return ref.once('value').then(response => {
      const profile = response.val();
      if (profile) {
        return this.getNominee(profile.nomineeId).then(nominee => {
          profile.nominee = nominee.response;
          return this.listNomineeOrganizations(nominee.id).then(orgs => {
            profile.organizations = orgs.response;
            return { response: profile };
          });
        });
      }
      return { response: profile };
    });
  };

  loadSurveyModel = async () => {
    const ref = firebase.database().ref(SURVEY_MODEL_PATH);
    const response = await ref.once('value').then(value => value.val());
    return { response };
  }

  saveSurveyModel = (surveyModel) => {
    const ref = firebase.database().ref(SURVEY_MODEL_PATH);
    return ref.set(surveyModel);
  }

  saveNominee = (details) => {
    const ref = firebase.database().ref();
    let data;
    let nomineeId;
    if(details.hasOwnProperty('key')) {
      const { key, ...nomineeDetails } = details; // eslint-disable-line
      nomineeId = key;
      data = nomineeValues(nomineeDetails, nomineeId);
    } else {
      nomineeId = ref.push().key;
      data = nomineeValues(details, nomineeId);
    }
    return ref.update(data).then(() => (nomineeId));
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
      nomineeId = ref.push().key;
      data = nomineeValues(details, nomineeId);
    }
    return ref.update(data).then(() => ({ response: details }));
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
      .orderByChild('firstName')
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
      .then(response => ({ response: response.val() }));
  };

  listNomineeOrganizations = (nomineeId) => {
    const ref = firebase.database().ref(`${NOMINEE_ORGANIZATIONS_PATH}/${nomineeId}`);
    return ref.once('value').then(response => {
      const orgIds = response.val() || [];
      return Promise.map(orgIds, this.getOrganization)
              .then(orgs => ({ response: orgs.map(o => o.response) }));
    });
  };

}

const client = new apiClient();

export default client;

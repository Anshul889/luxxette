import {FETCH_EMAILS, DELETE_EMAIL} from './notifypeopleConstants.js';
import { createReducer } from '../../app/common/util/reducerUtils';

const initialState = [];

const fetchEmails = (state, payload) => {
  return payload.emails;
};

const deleteEmail = (state, payload) => {
  return [...state.filter(product => product.id !== payload.id)]
}

export default createReducer(initialState, {
  FETCH_EMAILS: fetchEmails,
  DELETE_EMAIL: deleteEmail
})
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

//Intro into redux thunk
export function signInUser({ email, password }){
  return function(dispatch) {
    //Submit email password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        //If request is good..
        //update a state to indicate the user is authenticated
        dispatch({ type: AUTH_USER });
        //Save the JWT token
        //We can save the JWT token in local storage
        localStorage.setItem('token', response.data.token);
        //redirect to the route '/feature'
        //use react router for navigation
        browserHistory.push('/feature');
      })
        .catch(() => {
          //if request is bad ..
          //Show an error to the user
          dispatch(authError('Bad Login Info'));
        });
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}


export function signoutUser(){
  //When user signs out we must delete the JWT token
  localStorage.removeItem('token');
  return{
    type: UNAUTH_USER
  };
}


export function signupUser({ email, password}) {
  //again we use redux thunk
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
  }
}

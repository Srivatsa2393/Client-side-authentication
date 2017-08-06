import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:3090';

//Intro into redux thunk
export function signInUser({ email, password }){
  return function(dispatch) {
    //Submit email password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        //If request is good..
        //update a state to indicate the user is authenticated
        //Save the JWT token
        //redirect to the route '/feature'
        //use react router for navigation
        browserHistory.push('/feature');
      })
        .catch(() => {
          //if request is bad ..
          //Show an error to the user
        });
  }
}

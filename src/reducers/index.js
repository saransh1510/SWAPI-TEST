import { combineReducers } from 'redux';

// import local files
import login from './login';
import searchPlanet from './search';

export default combineReducers({
  login,
  searchPlanet,
})
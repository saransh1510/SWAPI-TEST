// import npm packages
import axios from "axios";

// import local files
import { BASE_URL } from './config';

export default axios.create({
  baseURL: BASE_URL,
  responseType: "json"
});

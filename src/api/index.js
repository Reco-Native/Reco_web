import axios from "axios";

const LoginURL = "https://rico.herokuapp.com/api";
//axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: LoginURL,
  
});


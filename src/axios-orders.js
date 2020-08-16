import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myburger-f881e.firebaseio.com/'
})

export default instance;

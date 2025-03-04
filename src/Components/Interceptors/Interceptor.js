import axios from 'axios';

// Create an instance of axios
const instance = axios.create();

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 403) {
      // Handle the error
      alert("Login expired. Please log in again!"); // Replace this with a custom popup/modal
    }
    return Promise.reject(error);
  }
);

export default instance;

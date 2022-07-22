import axios from "axios";
import qs from 'qs'

export const fetchWrapper = {
  get: request("get"),
  post: request("post"),
  put: request("put"),
  delete: request("delete"),
};

const request = (method) => {
  return (url, data) => {
    const requestConfig = {
      method,
      baseURL: 'https://todo-api-takeuchi-training.herokuapp.com/api/',
      transformRequest: [(data, headers) => {
        if (method === 'put') data = qs
        return data
      }],
      headers: {
        // if method is 'put' then
        // 'Content-type": "application/x-www-form-urlencoded'
        // else normally
        // 'Content-Type': 'application/json'
        // if request is send to private resource
        // 'Authorization': `Basic ${token}` 
        // or
        // 'Authorization': `Bearer ${token}` 
      }
    };
    if (body) {
      requestConfig;
    }
    return axios(requestConfig);
  };
};

const authHeader = (url) => {
  const token
}
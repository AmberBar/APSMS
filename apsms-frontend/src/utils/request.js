import fetch from 'dva/fetch';
import axios from 'axios';
import notie from 'notie';
import { getAPIDomain } from '../utils/config.js';
import { setcookie, localStorageService } from "../utils/common.js"

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log(response)
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(
    options, needToken = true) {  
      console.log(options)
      console.log(getAPIDomain())
    const token = localStorageService.getItem("user") != {}? localStorageService.getItem("user") : " ";

    console.log("****************")
    console.log(token)
    let defaultOptions = {    
      baseURL: getAPIDomain(),    
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    }
  
    const mergedOptions = {...defaultOptions, ...options}; 
    return axios(mergedOptions).then(checkStatus);
  }


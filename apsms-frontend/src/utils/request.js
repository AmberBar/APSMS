import fetch from 'dva/fetch';
import axios from 'axios';
import notie from 'notie';
import { getAPIDomain } from '../utils/config.js';

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

function checkServerError(response) {  
  console.log('sssssss') 
   console.log(response)  
   const data = response.data;  
      return response;
  }

export default function request(
  options, needToken = true) {  
    console.log(options)
    console.log(getAPIDomain())
  // const token = needToken ? getTokenInLocalStorage() : '';
  const token = ""
  let defaultOptions = {    
    baseURL: getAPIDomain(),    
    headers: { 
              'Content-Type': 'application/json',    
              // 'Access-Control-Allow-Origin' : '*' ,
              // 'Authorization': 'Bearer ' + token,  
              }  
  }
    const mergedOptions = {...defaultOptions, ...options}; 
    return axios(mergedOptions).then(checkStatus);
  }


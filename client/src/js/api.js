import fetch from 'isomorphic-fetch';
import axios from 'axios';

export function getDashboard() {
  return fetch('/api2/stage', {mode: 'no-cors'})
    .then((response) => response.json());
}

  /*
  axios.get('http://localhost:3001/api2/stage', {
  	headers: {
  	  'Access-Control-Allow-Origin': '*',
  	},
    proxy: {
	     host: '127.0.0.1',
	     port: 8080
	  }
  	}).then(function (response) {
  		console.log('response is : ' + response.data);
  	}).catch(function (error) {
  		if (error.response) {
  		  console.log(error.response.headers);
  		}
  		else if (error.request) {
  	      console.log(error.request);
  		}
  		else {
  		  console.log(error.message);
  		}
  	console.log(error.config);
  });
  */

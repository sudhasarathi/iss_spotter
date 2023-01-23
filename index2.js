const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised.js');

/* call fetchMyIP() function here, calling this function returns a promise, this returned promise in turn resolves with the
 * body of whatever the http request inside retrieved from the server, remember the resoloution is abstracted away from us by the request libary! */
fetchMyIP()
  /* the .then methods will only run if no errrors are encountered. The body which was previously resolved by the returned promise above now becomes IP address
  /* ipAdd in here is the body of whatever the incoming promise resolves with the above fetchMyIP() promise */
  .then(ipAdd => {
    const ip = JSON.parse(ipAdd).ip;
    return fetchCoordsByIP(ip);
  }).then(geoData => {
    const parsedBody = JSON.parse(geoData);
    const latLong = {lat: parsedBody.latitude, long: parsedBody.longitude};
    return fetchISSFlyOverTimes(latLong);
  }).then(flyoverTimes => {
    const flyoverTimesObj = JSON.parse(flyoverTimes);
    printPassTimes(flyoverTimesObj);
  })
  /* the erorr handling in this final .catch was already resolved in the returned promise from fetchMyIP(). If that resolved an error, it is dumped here
   * our catch block/condition at the end of our chain which will have a line drawn to it if any promises in the chain are rejected with errors */
  .catch(error => {
    console.log(error);
  });
  
// function to print the satelite flyover times
const printPassTimes = function(flyoverTimes) {

  for (const objectInResponseArr of flyoverTimes.response) {
  
    const formattedDateTime = new Date(0);
    formattedDateTime.setUTCSeconds(objectInResponseArr.risetime);
    const formattedDuration = objectInResponseArr.duration;
    console.log(`Next pass at ${formattedDateTime} for ${formattedDuration} seconds!`);
  }
};
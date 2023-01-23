// const iss = require('./iss');


/* iss.fetchIP( (err, ip) => {
  if(err) {
    console.log(err);
    return;
  } else {
    console.log(ip);
  }
}) */

/* iss.fetchCoordsByIP( "65.28.83.195", (err, coords) => {
  console.log(err);
  console.log(coords);
}); */


/* iss.fetchISSFlyoverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (err, times) => {
  console.log(err);
  console.log(times);
}); */



// master nextISSTimesForMyLocation() function called here, passing in the below arroe function as its one and only arg as a callback


const { nextISSTimesForMyLocation } = require('./iss.js');

/* loop through JS object of returned fly over times of satelistes
 * const formattedDateTime = new Date(objectInResponseArr.risetime)
 * put this info together in a string at the end here */
const printPassTimes = function(flyoverTimes) {

  for (const objectInResponseArr of flyoverTimes.response) {

    const formattedDateTime = new Date(0);
    formattedDateTime.setUTCSeconds(objectInResponseArr.risetime);
    const formattedDuration = objectInResponseArr.duration;

    console.log(`Next pass at ${formattedDateTime} for ${formattedDuration} seconds!`);
  }
};

// master nextISSTimesForMyLocation() function called here, passing in the below arroe function as its one and only arg as a callback
nextISSTimesForMyLocation((error, flyoverTimes) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  printPassTimes(flyoverTimes);
});

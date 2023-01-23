const request = require('request-promise-native');

/* This function should only have one line of code: its only job is to fetch the IP address from the API + return it where needed
 * this returns the wntire promise object (not just the body!!!) */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ip) {
  const geoLocationUrl = `https://freegeoip.app/json/${ip}`;
  return request(geoLocationUrl);
};

const fetchISSFlyOverTimes = function(coords) {
  const flyoverUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.long}`;
  return request(flyoverUrl);
};

// export needed modules
module.exports = { fetchMyIP: fetchMyIP, fetchCoordsByIP: fetchCoordsByIP, fetchISSFlyOverTimes: fetchISSFlyOverTimes };

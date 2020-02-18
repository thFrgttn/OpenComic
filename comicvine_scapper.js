const request = require('request-promise-cache');

const API_KEY = require('./config/APIKEY.js');

const BASE_URL = 'http://comicvine.gamespot.com/api/';

const requestVolumeIDS = (queryString, callback) => {
  const url =
    BASE_URL +
    'search/?api_key=' +
    API_KEY +
    '&format=json&limit=10&resources=volume&field_list=name,start_year,publisher,id,image,count_of_issues&query=' +
    queryString;

  request({ url, json: true })
    .then((body) => {
      if (body.number_of_total_results === 0) {
        callback('no results found');
      } else {
        callback(undefined, body);
      }
    })
    .catch((error) => {
      callback(error.message);
    });
};

const requestVolumeDetails = (volumeID, callback) => {
  const url =
    BASE_URL +
    'volume/4050-' +
    volumeID +
    '/?api_key=' +
    API_KEY +
    '&format=json&field_list=name,start_year,publisher,image,count_of_issues,id';

  request({ url, json: true })
    .then((body) => {
      if (body.number_of_total_results === 0) {
        callback('no results found');
      } else if (body.number_of_total_results > 1) {
        callback('more than one result found');
      } else {
        callback(undefined, body);
      }
    })
    .catch((error) => {
      callback(error.message);
    });
};

const requestVolumeIssues = (volumeID, callback) => {
  const url =
    BASE_URL +
    'issues/?api_key=' +
    API_KEY +
    '&format=json&field_list=name,issue_number,id,image&filter=volume:' +
    volumeID;

  request({ url, json: true })
    .then((body) => {
      if (body.number_of_total_results === 0) {
        callback('no results found');
      } else {
        callback(undefined, body);
      }
    })
    .catch((error) => {
      callback(error.message);
    });
};

const requestIssueDetailsByID = (issueID, callback) => {
  const url = BASE_URL + 'issue/4000-' + issueID + '/?api_key=' + API_KEY + '&format=json';

  request({ url, json: true })
    .then((body) => {
      if (body.number_of_total_results === 0) {
        callback('no results found');
      } else {
        callback(undefined, body);
      }
    })
    .catch((error) => {
      callback(error.message);
    });
};

const requestIssueDetailsByVolumeIssue = (volumeID, issue_number, callback) => {
  const url =
    BASE_URL +
    'issues/?api_key=' +
    API_KEY +
    '&format=json&filter=volume:' +
    volumeID +
    ',issue_number:' +
    issue_number;

  request({ url, json: true })
    .then((body) => {
      if (body.number_of_total_results === 0) {
        callback('no results found');
      } else {
        callback(undefined, body);
      }
    })
    .catch((error) => {
      callback(error.message);
    });
};

// requestVolumeIDS('Wonder Woman 001 (2016)', (error, body) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });

// requestVolumeDetails(91774, (error, body) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });

// requestVolumeIssues(91774, (error, body) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });

// requestIssueDetailsByID(537223, (error, body) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });

requestIssueDetailsByVolumeIssue(91774, 1, (error, body) => {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});

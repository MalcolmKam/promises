/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) {
      callback(err, null);
    } else {
      var firstLine = file.split('\n')[0];
      // Note the error first pattern here
      callback(null, firstLine);
    }
  });
};


// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request.get(url, function(err, response)) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response.statusCode);
    }
  }
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};

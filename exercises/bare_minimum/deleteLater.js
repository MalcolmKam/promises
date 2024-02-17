const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    // console.log(err, ' err ', Number(fileData), ' filedata');
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  readCounter((err, count) => {
    count++;
    writeCounter(count, (err, counterString) => {
      callback(err, counterString);
    });
  });
};


const readCounterAsync = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(exports.counterFile, (err, fileData) => {
      // console.log(err, ' err ', Number(fileData), ' filedata');
      if (err) {
        resolve(0);
      } else {
        resolve(Number(fileData));
      }
    });
  })
}


const writeCounterAsync = (count) => {
  return new Promise((resolve, reject) => {
    var counterString = zeroPaddedNumber(count);
    fs.writeFile(exports.counterFile, counterString, (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve(counterString);
      }
    });
  })
}

exports.getNextUniqueId = (callback) => {
  readCounter((err, count) => {
    count++;
    writeCounter(count, (err, counterString) => {
      callback(err, counterString);
    });
  });
};

const getNextUniqueId = () => {
  return readCounterAsync()
    .then(count => {
      count++
      return writeCounterAsync(count)
    })
    .catch(err => {
      throw err;
    })
}
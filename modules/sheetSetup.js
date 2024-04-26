const sheetIndices = {
  ENTRY: 5,
  "CA-OUT": 6,
  "CA-IN": 7,
  "BREAK-OUT": 8,
  "BREAK-IN": 9,
  EXIT: 10,
};

const checkIndices = {
  ENTRY: -1,
  "CA-OUT": 4,
  "CA-IN": 5,
  "BREAK-OUT": 4,
  "BREAK-IN": 7,
  EXIT: 4,
};

function getIndexForFunction(func) {
  if (!sheetIndices[func]) {
    return null;
  }
  return sheetIndices[func];
}

function getIndexForCheck(func) {
  if (!checkIndices[func]) {
    return null;
  }
  return checkIndices[func];
}

module.exports = {
  getIndexForCheck,
  getIndexForFunction,
};

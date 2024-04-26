const {
  getAuthToken,
  getSpreadSheetValues,
  setSpreadSheetValues,
} = require("./googleSheetsService");
const { getIndexForCheck, getIndexForFunction } = require("./sheetSetup");

async function markTiming(regNo, func) {
  const authToken = await getAuthToken();
  const sheetValues = await getSpreadSheetValues({
    spreadsheetId: process.env.SHEET_ID,
    auth: authToken,
  });
  const values = sheetValues.data.values;
  const index = getIndexForFunction(func);
  if (!index) {
    return [false, "Invalid Function"];
  }
  //   const checkIndex = getIndexForCheck(func);
  //   if (!checkIndex) {
  //     return [false, "Invalid Function"];
  //   }
  const rowNo = values.findIndex((row) => row[4] === regNo);
  if (rowNo === -1) {
    return [false, "Invalid Registration Number"];
  }
  //   if (checkIndex != -1 && !values[rowNo][checkIndex]) {
  //     return [false, "The previous step is not completed"];
  //   }
  const updatedRow = values[rowNo];
  updatedRow[index] = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  try {
    let res = await setSpreadSheetValues({
      spreadsheetId: process.env.SHEET_ID,
      auth: authToken,
      updatedRow: [updatedRow],
      rowNo: rowNo + 1,
    });
  } catch (error) {
    console.error(error);
    return [false, "Internal Server Error"];
  }
  return [
    true,
    {
      Name: updatedRow[1] + " " + updatedRow[2],
      "Reg No": updatedRow[4],
    },
  ];
}

module.exports = markTiming;

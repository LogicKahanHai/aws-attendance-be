const { google } = require("googleapis");

const sheets = google.sheets("v4");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({ spreadsheetId, auth }) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({ spreadsheetId, auth }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: process.env.SHEET_NAME,
  });
  return res;
}

async function setSpreadSheetValues({
  spreadsheetId,
  auth,
  updatedRow,
  rowNo,
}) {
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId,
    auth,
    range: `${process.env.SHEET_NAME}!A${rowNo}:J${rowNo}`,
    valueInputOption: "RAW",
    resource: {
      values: updatedRow,
    },
  });
  return res;
}

module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
  setSpreadSheetValues,
};

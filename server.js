const express = require("express");
const dotenv = require("dotenv");
const {
  getAuthToken,
  getSpreadSheet,
} = require("./modules/googleSheetsService");
const markTiming = require("./modules/markTiming");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.get("/check-sheet", async (req, res) => {
  try {
    const authToken = await getAuthToken();
    const sheet = await getSpreadSheet({
      spreadsheetId: process.env.SHEET_ID,
      auth: authToken,
    });
    res.send(sheet.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/mark-time", async (req, res) => {
  console.log(req.body);
  const { regNo, func } = req.body;
  if (!regNo || !func) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    result = await markTiming(regNo, func);
    if (!result[0]) {
      return res.status(400).json({ error: result[1] });
    }
    res.status(200).json({ message: result[1] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

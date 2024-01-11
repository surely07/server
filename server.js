const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    );

    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Steam API 에러: ", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

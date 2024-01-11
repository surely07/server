const express = require("express");
const axios = require("axios");

const app = express();
const port = 8000;

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    );
    res.json(data);
    // res.send("Hello World!");
  } catch (error) {
    console.error("api 호출 중 오류: ", error);
    res.status(500).send("서버 에러");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const axios = require("axios");
const fs = require("fs").promises;

const app = express();
const port = 8000;

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    );

    // 현재 db.json 데이터 읽기
    const currentData = await fs.readFile("db.json", "utf-8");
    const jsonData = JSON.parse(currentData);

    // db.json에 업데이트
    jsonData.apps = data.apps;
    await fs.writeFile("db.json", JSON.stringify(jsonData, null, 2));

    res.json(jsonData);
  } catch (error) {
    console.error("api 호출 중 오류: ", error);
    res.status(500).send("서버 에러");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

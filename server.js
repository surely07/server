const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());

// app.get("/api/applist", async (req, res) => {
//   try {
//     const { data } = await axios.get(
//       "https://api.steampowered.com/ISteamApps/GetAppList/v2"
//     );

//     res.json(data);
//     console.log(data);
//   } catch (error) {
//     console.error("Steam API 에러: ", error);
//     res.status(500).send("Server error");
//   }
// });

app.get("/api/most-played-games", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
    );
    res.json(data);
  } catch (error) {
    console.error("Steam API 에러: ", error);
    res.status(500).send("Server error");
  }
});

app.get("/api/game-details/:appid", async (req, res) => {
  const appid = req.params.appid;
  try {
    const { data } = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&l=korean`
    );
    res.json(data);
  } catch (error) {
    console.error("Steam API 에러: ", error);
    res.status(500).send("Server error");
  }
});

// app.get("/api/top-ten", async (req, res) => {
//   try {
//     const { data } = await axios.get(
//       "https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
//     );
//     const applist = data.data.response.ranks;
//     const appids = applist.slice(0, 10);

//     if (appids) {
//       const gameDetailsPromises = appids.map((appid) => {
//         return axios.get(
//           `https://store.steampowered.com/api/appdetails?appids=${appid}&l=korean`
//         );
//       });

//       const gameDetailResponses = await Promise.all(gameDetailsPromises);
//       const gameDetailData = gameDetailResponses.map(
//         (response) => response.data
//       );

//       res.json(gameDetailData);
//     } else {
//       console.error(
//         "top ten 패치 에러: data.ranks is undefined or not an array"
//       );
//       res.status(500).send("Server error");
//     }
//   } catch (error) {
//     console.error("top ten 패치 에러: ", error);
//     res.status(500).send("Server error");
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

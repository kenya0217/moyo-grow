const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");
const axios = require("axios");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

async function createReplyMessage(input) {
  // Yahoo! 郵便番号検索API
  // https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/zipcodesearch.html#response_field
  const params = {
    appid: process.env.YJDN_CLIENT_ID,
    query: input,
    output: "json",
    results: 1
  };
  const { data } = await axios.get(
    "https://map.yahooapis.jp/search/zip/V1/zipCodeSearch",
    { params }
  );

  if (data.ResultInfo.Count === 0) {
    return {
      type: "text",
      text: `住所、郵便番号を送ってくれれば君だけのアルパカを生みます`
    };
  }

  const feature = data.Feature[0];
  const Coordinates = feature.Geometry.Coordinates;
  
 const x = Coordinates.split(",");
 const power = Number(x[0].substr(7,3));
 const hp = Number(x[1].substr(7,3));
 let text2;
 let text3;
 if(power>=500){
  text2 = "君のアルパカパワーはとても強大だ";

 }
 else{
   text2="君のアルパカは貧弱だ";
 }
  if(hp>=600){
  text3 = "君のアルパカはとても最強の脚力を持っている";

 }
 else{
   text3="君のアルパカは足はダメだ";
 }

  return [{
    type: "text",
    text: `君のアルパカパワーは${power}
君のアルパカの脚力は${hp}`
  },{
    type: "text",
    text: text2
  },{
    type: "text",
    text: text3

  }
  ];

}


const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/webhook", line.middleware(lineConfig), async (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  for (const event of req.body.events) {
    if (event.type === "message" && event.message.type === "text") {
      try {
        const message = await createReplyMessage(event.message.text);
        lineClient.replyMessage(event.replyToken, message);
      } catch (err) {
        console.log("エラー発生！", err.message, err.stack);
        console.log(err.message);
        console.log(err.stack);
      }
    }
  }
});

server.listen(process.env.PORT || 8080);

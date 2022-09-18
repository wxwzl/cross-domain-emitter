/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const ip = require("ip");
const path = require("path");
const { writeFileSync } = require("fs");
const app = express();
const port = 5001;
app.use(express.static(path.join(__dirname, "../public")));
app.use("/dist", express.static(path.join(__dirname, "../../../dist")));
let ipStr = ip.address();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.listen(port, ipStr, () => {
  console.log(`Example app listening at http://${ipStr}:${port}`);
});

app.listen(5002, ipStr, () => {
  console.log(`Example app listening at http://${ipStr}:5002`);
});
app.listen(5003, ipStr, () => {
  console.log(`Example app listening at http://${ipStr}:5003`);
});
writeFileSync(path.join(__dirname, "../public/host.js"), `var host='${ipStr}';`);

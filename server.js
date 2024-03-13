const http = require("http");
const fs = require("fs");

const networkIP = "https://globalchatback-jemh.onrender.com"
const PORT = 3000


const server = http.createServer((req, res) => {
   res.setHeader("Access-Control-Allow-Origin", "*")
  if (req.url === "/get/text" && req.method === "GET") {
    fs.readFile("./text.txt", "utf8", (err, data) => {
      res.end(data);
    });
  } else if (req.url === "/add/text" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
        if(body.length > 1) {
            fs.appendFile("./text.txt", `${body},\n`, (err) => {});
        }
    });
  } else {
    res.end("error");
  }
});

server.listen(PORT, networkIP, () => {
  console.log(`Server Is Running On ${networkIP}:${PORT}` );
});

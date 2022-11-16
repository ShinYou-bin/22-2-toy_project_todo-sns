// 서버 사용을 위해 http모듈을 http라는 변수에 담는다.
const http = require('http');
const fs = require('fs');
const express = require("express");
const PORT = 3100;
const app = express();


// // http모듈로 서버를 생성한다. 
// var app = http.createServer(function(req,res){
//   var url = req.url;
//     if(req.url=='/'){
//         url = '/frontend/myPage.html'
//     }
//     if(req.url == '/favicon.ico'){
//         return res.writeHead(404);
//     }
//     res.writeHead(200);
//     res.end(fs.readFileSync(__dirname+url))
// });

// // listen 함수로 3100 포트에 서버를 실행한다.
// app.listen(3100, function(){
//   console.log("server is running.")
// });

app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/views/main.html");
});

// app.get("/my", (req, res) => {
//   res.sendFile(__dirname+"/views/MyPage.html");
// });

app.get("/world", (req, res) => {
  res.sendFile(__dirname+"/views/worldPage.html")
})

app.listen(PORT, () => {
  console.log('제발 좀 되라 진짜... ')
})

app.get("/my", (req, res) => {
  fs.readFile(__dirname+"/views/MyPage.html", function(error, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data)
  })
})



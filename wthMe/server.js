const fs = require('fs');
const express = require("express");
// const todoList = require('./views/MyPage');
const PORT = 3200;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/views/main.html");
});


app.get("/world", (req, res) => {
  res.sendFile(__dirname+"/views/worldPage.html")
  console.log(todoList);
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

const keyValue = 220201;
const todoLists = [];
todoLists[keyValue] = [];

app.post("/add_list", (req,res) => {
  const newContent = req.body.content
  todoLists[keyValue].push(newContent)
  console.log(newContent+'추가')
  // res.redirect('/my')
  // console.log(todoLists)
})



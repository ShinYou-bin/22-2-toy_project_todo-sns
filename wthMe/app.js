const express =require('express')
const app = express()
const port = 3200

let toDoLists = ["밥먹기"]

app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index', {toDoListTitle: '오늘의 할 일: ' + toDoLists.length, toDoLists: toDoLists})
})

app.post('/add_list', (req, res) => {
    const newContent = req.body.content
    console.log(newContent + '추가')
    toDoLists.push(newContent)
    res.redirect('/')
})

app.get('/delete_list/:id', (req,res) => {
    const deleteContent = req.params.id
    console.log(deleteContent + '삭제')
    toDoLists = toDoLists.filter((value) => value != deleteContent)
    res.redirect('/')
})

app.listen(port, () => {
    console.log('연결됨')
})
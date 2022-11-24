const express = require('express');
const postsRouter=require('./routes/posts')
const commentsRouter=require('./routes/comments')
const connect = require('./schemas');
connect()

const app = express();
const port = 3000;

app.use(express.json())

app.use('/api',[postsRouter],[commentsRouter])

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
});
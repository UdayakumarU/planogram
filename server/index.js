const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const { DB } = require('./db');
const { processShelfAlignment } = require('./utils');


const mockDB = new DB();
const app = express();
app.use(cors());

const port = 8080;
const server = app.listen(port,()=> console.log(`listening at ${port}`));

app.get('/items', (req, res)=>{
    res.send(mockDB.getProducts());
});

const io = socket(server, { cors: {
    origin: "*",
    methods: ["GET", "POST"]
}});


io.on('connection', (socket)=>{
    socket.on("fromShelf", (itemsIntheShelf)=>{
        const productsAlignment = processShelfAlignment(itemsIntheShelf, mockDB.getProducts())
        mockDB.setProducts(productsAlignment);
        io.emit("toPlanogram", mockDB.getProducts());
    })
});
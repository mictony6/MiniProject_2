const express = require('express');
const {script1Start} = require('./script1');
const {script2Start} = require('./script2');
const {script3Start} = require('./script3');
const {script4Start} = require("./script4");
const {script5Start} = require("./script5");
const app = express();
const port = 8000;


app.get('/api/:province/:municipality/callback', async (req, res) => {
    try {
        const {province, municipality} = req.params;    
        script1Start(province, municipality, (error, data) => {
            console.log(data);
            res.json(data.data);
        });
    } catch (error) {
        console.error(error);
    }
});


app.get('/api/:province/:municipality/promise', async (req, res) => {
    try {
        const {province, municipality} = req.params;    
        let data = await script2Start(province, municipality);
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});

app.get('/api/:province/:municipality/async', async (req, res) => {
    try {
        const {province, municipality} = req.params;    
        let data = await script3Start(province, municipality);
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});


app.get('/api/:province', async (req, res) => {
    try {
        const {province} = req.params;
        let data = await script4Start(province);
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});


app.get('/api', async (req, res) => {
    try {
        const {province} = req.params;
        let data = await script5Start();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});


app.listen(port, () => {
    console.log(`
    Server started at http://localhost:${port}.
    Callback: http://localhost:${port}/callback/Iloilo/Miagao.
    Promise:  http://localhost:${port}/promise/Iloilo/Miagao.
    Async/Await: http://localhost:${port}/async/Iloilo/Miagao.`);
});
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app =  express();
const port = 3000;
const API_KEY = "AsRPIBeeAng8K1210CFFMlGUGwRsT992cZjPumby";
const URL = "https://api.nasa.gov/planetary/apod?api_key=";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req,res)=>{
    try {
        const source = await axios.get(URL + API_KEY);
        const result = source.data;
        const address = result.hdurl;
        const date = result.date;
        const exp = result.explanation;
        const title = result.title;
        res.render("index.ejs", {url: address, date: date, explanation: exp, title: title});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/login", (req,res)=>{
    res.render("partials/login.ejs");
});

app.post("/search", async (req,res)=>{
    try{
        let start_date = req.body.startDate;
        let end_date = req.body.endDate;
        const source = await axios(URL + API_KEY + "&start_date="+ start_date + "&end_date="+ end_date);
        const results = source.data;
        if (Array.isArray(results) && results.length > 0) {
            const latestResult = results[results.length - 1]; // Get the last entry
            const address = latestResult.hdurl;
            const exp = latestResult.explanation;
            const title = latestResult.title;

            res.render("partials/searched.ejs", {
                urlS: address,
                explanationS: exp,
                titleS: title,
                start: start_date,
                end: end_date
            });}
    }catch(error){
        res.status(404).send(error.message);
    }
});

app.get("/insight", (req,res)=>{
    res.render("partials/insight.ejs");
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});
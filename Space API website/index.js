import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app =  express();
const port = 3000;
env.config();
const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req,res)=>{
    try {
        const source = await axios.get(URL + API_KEY);
        const result = source.data;
        const address = result.hdurl;
        const add2 = result.url;
        const date = result.date;
        const exp = result.explanation;
        const title = result.title;

        if(address){
            res.render("index.ejs", {url: address, date: date, explanation: exp, title: title});
        }
        else{
            res.render("index.ejs", {url: add2, date: date, explanation: exp, title: title});
        }
        
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
            const latestResult = results[Math.floor(Math.random() * results.length)]; // Get the last entry
            const address = latestResult.hdurl;
            const add2 = latestResult.url;
            const exp = latestResult.explanation;
            const title = latestResult.title;


            if(address)
            {   
                res.render("partials/searched.ejs", {
                urlS: address,
                explanationS: exp,
                titleS: title,
                start: start_date,
                end: end_date
                });
            }else{
                res.render("partials/searched.ejs", {
                    urlS: add2,
                    explanationS: exp,
                    titleS: title,
                    start: start_date,
                    end: end_date
                });
            }
        }
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
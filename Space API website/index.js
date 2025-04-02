import express from "express";
import axios from "axios";

const app =  express();
const port = 3000;
const API_KEY = "AsRPIBeeAng8K1210CFFMlGUGwRsT992cZjPumby";
const URL = "https://api.nasa.gov/planetary/apod?api_key=";

app.use(express.static("public"));

app.get("/", async (req,res)=>{
    const source = await axios.get(URL + API_KEY);
    const result = source.data;
    const address = result.hdurl;
    const address2 = result.url;
    const date = result.date;
    const exp = result.explanation;
    const title = result.title;
    res.render("index.ejs", {url: address2, date: date, explanation: exp, title: title});
});

app.get("/login", (req,res)=>{
    res.render("partials/login.ejs");
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});
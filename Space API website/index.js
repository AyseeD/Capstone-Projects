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
    let strResult = JSON.stringify(result)
    res.render("index.ejs", {content: strResult});
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});
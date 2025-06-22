import express from "express";
import bodyParser from "body-parser";
import PG from "pg";
import env from "dotenv";

const app =  express();
const port = 3000;
env.config()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const db =  new PG.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
db.connect();

let booklist = [];

app.get("/", async (req,res)=>{
    try {
        let k = await db.query("SELECT * FROM books ORDER BY title ASC");
        booklist = k.rows;
        res.render("index.ejs", {
            books: booklist
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/add", (req, res)=>{
    res.render("partials/Add.ejs");
});

app.post("/new", async (req, res)=>{
    const tit = req.body.title;
    const aut = req.body.author;
    const rev = req.body.review;
    const isbn = req.body.isbn;

    try {
        booklist = await db.query("INSERT INTO books (title, author, review, picture) VALUES ($1, $2, $3, $4);", [tit,aut,rev,isbn]);
    } catch (error) {
        console.log(error);
    }

    res.redirect("/");
});

app.post("/edit",async (req,res)=>{
    let id = req.body.id;
    let tit = req.body.title;
    let rev = req.body.review;
    let aut = req.body.author;
    let pic = req.body.isbn;
    
    try {
        await db.query("UPDATE books SET title = $1, author = $2, review = $3, picture = $4 WHERE id = $5",[tit,aut,rev,pic,id]);
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});

app.post("/delete", async (req,res)=>{
    let id =req.body.id;

    try {
        await db.query("DELETE FROM books WHERE id = $1;", [id]);
    } catch (error) {
        console.log(error);
    }
    
    res.redirect("/");
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
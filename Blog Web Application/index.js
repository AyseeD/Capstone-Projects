import bodyParser from "body-parser";
import express from "express";
const app =  express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let posts = [];

app.get("/", (req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/blog",(req,res)=>{
    res.render("partials/blog.ejs");
});

app.get("/contact",(req,res)=>{
    res.render("partials/contact.ejs");
});

app.post("/submit", (req, res) => {
    let { Name, Text, postId } = req.body;

    if (postId) {
        postId = parseInt(postId);
        let post = posts.find(p => p.id === postId);
        if (post) {
            post.Name = Name;
            post.Text = Text;
        }
    } else {
        let newPost = { id: posts.length + 1, Name, Text};
        posts.push(newPost);
    }

    res.redirect("/");
});


app.get("/Delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect("/");
});

app.get("/Update/:id", (req, res) => {
    let postId = parseInt(req.params.id);
    let post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("partials/update.ejs", { postId: post.id, Name: post.Name, Text: post.Text });
});


app.listen(port,()=>{
    console.log(`Listenig to ${port}`);
});
const express = require("express");
const mongoose  = require("mongoose");
const Blog = require("./models/blog");

const app =express();

app.use(express.urlencoded({ extended : true}))
const dburi = "mongodb+srv://corizo:test1234@nodetuts.dwgm4th.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dburi)
.then(()=>{
    console.log("db connected"); 
})
.catch((err)=>{
    console.log(err);
})



// app.get("/add-blog",(req,res)=>{
//     const blog= new Blog({
//         title:"New Blog",
//         snippet: "About Blog",
//         description:"Description about your blog"
//     })
//     blog.save()
//     .then((result)=>{
//         res.send(result);
//     }).catch((error)=>{
//         res.send(error);
//     })
// })

// app.get("/all-blog",(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     }).catch((error)=>{
//         res.send(error);
//     })
// })

// app.get("/single-blog",(req,res)=>{
//     Blog.findById("635788d6aaead361cba89319")
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
// })

app.set('view engine', 'ejs');



// const blogs =[
//     {title: "Blog-1", snippet:"loremldvdmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlml"},
//     {title: "Blog-2", snippet:"loremldvdmlmlmlfsfdfddsdsfdsfdsfsdffsfsssflmlmlmlmlmlmlmlmlmlml"},
//     {title: "Blog-3", snippet:"loremldvdmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmldfefdfmlml"},
// ]

app.get("/",(req,res)=>{
   
    // res.render("index",{title: "Home", blogs:blogs});
    res.redirect("/blogs")
})

app.get("/blogs",(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render("index",{title:"all-blog",
            blogs: result
    })
    })
    .catch((error)=>{
        console.log(error);
    })
})

app.post("/blogs",(req,res)=>{
   const blog =new Blog(req.body)
   blog.save().then((result)=>{
    res.redirect("/blogs");
   }).catch((error)=>{
        console.log(error);
   })
})




app.get("/about",(req,res)=>{
    res.render("about",{title:"About"});
})

app.get("/blogs/create",(req,res)=>{
    res.render("create",{title:"Create"});
})

app.get("/blogs/:id",(req,res)=>{
    const id= req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render("details",{title:"all-details",
        blog:result
    });
    })
    .catch((error)=>{
        console.log(error);
    })
})


app.delete("/blogs/:id",(req,res)=>{
    const id=req.params.id
    Blog.findByIdAndDelete(id).then((result)=>{
        res.json({redirect: '/blogs'})
        
    })
    .catch((error)=>{
        console.log(error);
    })
})

app.use((req,res)=>{
    res.status(404).render("404");
})

app.listen(3000,()=>{
    console.log("Server is running");
})
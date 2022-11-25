const http = require("http");
const fs = require("fs");
const _ = require("loadash");


const server = http.createServer((req, res) => {
    console.log("request");
    console.log(req.url);
    const num = _.random(0,20);
    console.log(num);

    // console.log(req.method);
    res.setHeader("Content-Type", 'text/html');
    // res.write("hello world");
    // res.end();
    let path = "./views/";

    if(req.url == '/')
    {
        path+= "index.html";
        res.statusCode =200;
    }
    else if (req.url == '/about')
    {
        path+= "about.html";
        res.statusCode =200;
    }
    else if (req.url == '/about-me')
    {
        res.statusCode =301;
        res.setHeader("Location","/about");
        res.end();
    }
    else
    {
        path+= "404.html";
        res.statusCode =200;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
})

server.listen(3000, "localhost", () => {
    console.log("3td paramater callback function called when server start listening your request");
})
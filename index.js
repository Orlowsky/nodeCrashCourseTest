
const http = require('http');
const path = require('path');
const fs = require('fs')

const server = http.createServer((req,res)=>{

let filePath = path.join(__dirname,'public', req.url === '/' ? 'index.html':(req.url))

//extention of file
let extname = path.extname(filePath)
console.log(filePath,extname)
let contentType = 'text/html'

//check ext and set content type
switch(extname){
    case '.js':
    contentType = 'text/javascript';
    break;
    case '.css':
    contentType = 'text/css';
    break;
    case '.json':
    contentType = 'application/json';
    break;
    case '.png':
    contentType = 'image/png';
    break;
    case '.jpg':
    contentType = 'image/jpg';
    break;

}
//read file 
    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code == 'ENOENT'){
                //page not found 
                fs.readFile(path.join(__dirname,'public', '404.html'), (err, content)=>{
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content,'utf8');
                })
            }else{
                //some server error
                res.writeHead(500);
                res.end(`Server error: ${err.code}`)
            }
        }else{
            //success
            console.log(content)
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content,"utf8")
        }
    })
// można by połączyć pare stron w całość np oddzielnie fs head, oddzielnie linki oddzielnie body content oddzielnie menu itp 
 
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))


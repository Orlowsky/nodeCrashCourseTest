//get file 
/* const Person = require("./person")


var human1 = new Person("mike wazowski", 12 );
human1.greetings() */

//event emmitter 
// const Logger = require('./logger')
// const fs = require('fs')
// const path = require('path')

// const logger = new Logger();
// logger.on('message', data=> {console.log(`Called Listener`, data)
// fs.appendFile(path.join(__dirname,'test',"test_logger.txt"),`${data.time}, ${data.id}, ${data.msg}`,(err) =>{
//             if(err) throw err;
//             console.log("file written to ")
        
            
//         });
// });
// logger.log("hello World");

const http = require('http');
const path = require('path');
const fs = require('fs')

const server = http.createServer((req,res)=>{
console.log(req.url)
if(req.url === '/'){
    fs.readFile(path.join(__dirname,"public","index.html"), 'utf8',(err,pageData)=>{
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(pageData);
        res.end()
    })
    
}else if(req.url === '/about'){
    fs.readFile(path.join(__dirname,"public","about.html"), 'utf8',(err,pageData)=>{
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(pageData);
        res.end()
    })
   /*  res.writeHead(200, {'Content-Type': 'text/html'})
    res.write("<h2>About</h2>");
    res.end() */
}else if(req.url === '/api/users'){
    const users = [
        {name:'bob smith', age:40},
        {name:'John Doe', age:30}
    ]
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(users))
}

 
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))



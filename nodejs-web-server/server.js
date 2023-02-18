const http = require('http');

const reqListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const {method,url} = request;

    
    if(url === '/'){
        if(method === "GET"){
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: "Ini adalah homepage",
            })) 
            
        }
        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }))  
            
        }
    }
    else if(url === '/about'){
        if(method === "GET") {
            response.statusCode = 200; 
            response.end(JSON.stringify({
                message: 'Halo ini adalah halaman about',
            }))  
            
        }

        else if(method === "POST"){
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            })

            response.statusCode = 200; 
            request.on('end', () => {
                body = Buffer.concat(body). toString();
                const {name} = JSON.parse(body);
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                })) 
                
            })
        }

        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }))  
            
        }
    }
    else{
        response.statusCode = 404; 
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }))
       
    }
    

}
const server = http.createServer(reqListener);

const port = 5000;
const host = 'localhost';

server.listen(port,host,() => {
    console.log(`Server berjalan pada http://${host}:${port}`)
})
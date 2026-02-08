// Import built-in Node.js modules
const http = require('http');
const fs = require('fs');
const path = require('path');
// Create the server instance
const server = http.createServer((req, res) => {
    let filePath = '';

// ROUTING LOGIC: Determine which file to serve based on URL
    if (req.url === '/' || req.url === '/home') {
        filePath = path.join(__dirname, 'home.html');
        res.statusCode = 200;
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
        res.statusCode = 200;
    } else if (req.url === '/contact') {
        filePath = path.join(__dirname, 'contact.html');
        res.statusCode = 200;
    } else {
        filePath = path.join(__dirname, '404.html');
        res.statusCode = 404; // Custom 404 page requirement
    }

    // ASYNCHRONOUS FILE READING: Read the file from the disk
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Error handling for missing files
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
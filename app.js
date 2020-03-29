var http = require('http')
var fs = require('fs');
http.createServer((req, res) => {
  if (req.method === 'POST'){
    var body = '';
    req.on('data', data => {
      body +=data;
    });
    req.on('end', () => {
      fs.writeFile('message.txt', body, err => {
    if (err) throw err;
      });
      res.write('saved');
      res.end()
    });
  } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
      <!doctype html>
      <html>
      <body>
          <form action="/message" method="POST">
          <input type="text" name="Message" placeholder="Enter Your Message" />
          <button type="submit">Submit</button>
          </form>
      </body>
      </html>
    `);
      res.end();
    }
}).listen(8080);


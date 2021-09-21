const fs = require("fs");

function Resp(res) {
  let _res = res;

  this.send = (body) => {
    _res.end(body);
  };

  this.status = (code) => {
    if (code > 99 && code < 600) {
      _res.statusCode = code;
    }
  };

  this.statusMessage = (message) => {
    _res.statusMessage = message;
  };

  this.setHeader = (name, value) => {
    _res.setHeader(name, value);
  };

  this.render = (file) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        this.status(404);
        this.statusMessage("File not found");
        _res.end("File not found");
      }

      _res.writeHead(200, { "Content-Type": "text/html" });
      _res.end(data);
    });
  };

  this.json = (file) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        this.status(404);
        this.statusMessage("File not found");
        _res.end("File not found");
      }

      _res.writeHead(200, { "Content-Type": "application/json" });
      _res.end(JSON.stringify(data));
    });
  };
}

module.exports = Resp;

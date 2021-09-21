const url = require("url");
const http = require("http");

let _server;
const _route = function (callback, path, method = "GET") {
  _server.on("request", (req, res) => {
    if (req.method === method) {
      const currentPath = url.parse(req.url).pathname;
      if (path == currentPath) {
        callback(req, res);
      }
    }
  });
};

function Route(port) {
  _server = http.createServer().listen(port);
  console.log(`Server is started on http://localhost:${port}/`);

  this.all = (path, ...callback) => {
    _server.on("request", (req, res) => {
      const currentPath = url.parse(req.url).pathname;
      if (path == currentPath) {
        callback.forEach((item) => {
          item(req, res);
        });
      }
    });
  };

  this.get = (path, callback) => {
    _route(callback, path);
    return this;
  };

  this.post = (path, callback) => {
    _route(callback, path, "POST");
    return this;
  };

  this.put = (path, callback) => {
    _route(callback, path, "PUT");
    return this;
  };

  this.delete = (path, callback) => {
    _route(callback, path, "DELETE");
    return this;
  };

  this.head = (path, callback) => {
    _route(callback, path, "HEAD");
    return this;
  };

  this.patch = (path, callback) => {
    _route(callback, path, "PATCH");
    return this;
  };

  this.options = (path, callback) => {
    _route(callback, path, "OPTIONS");
    return this;
  };
}

module.exports.fastserver = (port = 3000) => new Route(port);

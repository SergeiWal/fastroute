class Route {
  constructor(server) {
    this._url = require("url");
    this._server = server;
  }

  _route(callback, path, method = "GET") {
    this._server.on("request", (req, res) => {
      if (req.method === method) {
        const url = this._url.parse(req.url).pathname;
        if (path == url) {
          callback(req, res);
        }
      }
    });
  }

  all(path, ...callback) {
    this._server.on("request", (req, res) => {
      const url = this._url.parse(req.url).pathname;
      if (path == url) {
        callback.forEach((item) => {
          item(req, res);
        });
      }
    });
  }

  get(path, callback) {
    this._route(callback, path);
  }

  post(path, callback) {
    this._route(callback, path, "POST");
  }

  put(path, callback) {
    this._route(callback, path, "PUT");
  }

  delete(path, callback) {
    this._route(callback, path, "DELETE");
  }

  head(path, callback) {
    this._route(callback, path, "HEAD");
  }

  patch(path, callback) {
    this._route(callback, path, "PATCH");
  }

  options(path, callback) {
    this._route(callback, path, "OPTIONS");
  }
}

module.exports.route = (server) => new Route(server);
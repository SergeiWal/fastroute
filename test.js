const http = require("http");
const fastroute = require("./route");

const server = http.createServer();
const route = fastroute.route(server);
server.listen(5000, () => {
  console.log("Server is started on http://localhost:5000/");
});

route
  .get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Get request...");
  })
  .get("/html", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("/html: get request...");
  })
  .post("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Post request ...");
  })
  .delete("/html", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("/html: delete request...");
  })
  .all(
    "/all",
    () => {
      console.log("/all: 1");
    },
    () => {
      console.log("/all: 2");
    },
    (req, res) => {
      console.log("/all: 3");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("/all: finish");
    }
  );

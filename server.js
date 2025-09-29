const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

// Use db.json in the same folder
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: "public"
});

// Middleware (logger, CORS, etc.)
server.use(middlewares);

// Enable CORS (important for frontend apps on GitHub Pages)
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
server.use(router);

// Use 4300 locally, but let Render/host override with process.env.PORT
const PORT = process.env.PORT || 4300;

server.listen(PORT, () => {
  console.log(`✅ JSON Server is running at http://localhost:${PORT}`);
});

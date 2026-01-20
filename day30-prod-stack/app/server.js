const http = require("http");
const redis = require("redis");

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  await client.connect();
})();

const server = http.createServer(async (req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    return res.end("OK");
  }

  const count = await client.incr("hits");
  res.end(`Hits: ${count}`);
});

server.listen(3000, () => console.log("App running on 3000"));

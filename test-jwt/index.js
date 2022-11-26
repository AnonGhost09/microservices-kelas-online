//install jsonweb token > npm install jsonwebtoken --save
const jwt = require("jsonwebtoken");

const JWT_SECRET = "21312";

//buat basic token dengna proses syncronnous
const token = jwt.sign({ data: { kelas: "bwamicro" } }, JWT_SECRET, {
  expiresIn: "5s",
});
console.log(token);

//membuat dengna asyncronous
jwt.sign(
  { data: { kelas: "bwamicro" } },
  JWT_SECRET,
  { expiresIn: "1m" },
  (err, token) => {
    console.log(token);
  }
);

//cara 1
jwt.verify(token, "awda", (err, decoded) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(decoded);
});

//cara 2
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log(decoded);
} catch (e) {
  console.log(e.message);
}

//cek dengna node index.js

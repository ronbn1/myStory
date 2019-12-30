const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

//Connect to database
connectDB();

//Body parser
app.use(express.json({ extended: false }));

//Route Middlewares
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURI)
  .then(() => console.log("Database Connected Successfully !!"))
  .catch(() => console.log("Something Went Wrong Please Check your code !!"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/health", (req, res) => {
  res.status(200).json({
    Message: `Everything is fine !!`,
  });
});

app.use("/api/auth", require("./controllers/auth"));
app.use("/api/post", require("./controllers/post"));
app.use("/api/user", require("./controllers/user"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY;
const User = require("../models/auth");

// Middleware to check if the user is logged in
const requireLogin = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.status(403).json({
      msg: `Please login first one !!`,
    });
  }
  const bearerToken = bearerHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, SECRETKEY, (err, payload) => {
    if (err) {
      res.status(403).json({
        msg: `Please login first two ${err}`,
      });
    }
    const {_id} = payload;
    User.findById(_id)
      .then((dbuser) => {
        if (!dbuser) {
          return res.status(404).json({ error: `User not found` });
        }
        req.user = dbuser;
        next();
      })
      .catch((err) => {
        res.status(500).json({ error: `Internal Error !!` });
      });
  });
};
module.exports = requireLogin;

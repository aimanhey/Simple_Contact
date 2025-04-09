const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("./models/user.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const tokenss = req.headers["x-auth-token"];
console.log(tokenss)
  if (tokenss && tokenss.startsWith("Bearer")) {
    try {
      token = tokenss.split(" ")[1];

      const decoded = jwt.verify(token, "secretkey");
      console.log(decoded);
      req.user = await User.findById(decoded.user);
      console.log(req.user);
      if(req.user){
        next();
      }
      else{
        throw new Error("Not authorized, token failed");
      }
    } catch (error) {
      console.error(error);
      console.log('testtttt jwt')
      res.status(401).json({ error: error.message });
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;

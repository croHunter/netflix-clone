const jwt = require("jsonwebtoken");
function verify(req, res, next) {
  const authorization = req.headers.authorization; // Based on 'Bearer ksfljrewori384328289398432'
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err, credentials) => {
        if (err) {
          res.status(403).json(`${err.message}: Token is not valid!`);
        } else {
          req.user = credentials; //data from the token
          next();
        }
      }
    );
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;

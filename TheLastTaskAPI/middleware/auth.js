function auth(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      let payload = jwt.verify(token, "key");

      next();
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.send("Please Login!");
  }
}

module.exports = auth;

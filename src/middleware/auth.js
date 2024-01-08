const auth = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("You are not authorized to view the resource.");
  }
};

module.exports = auth;

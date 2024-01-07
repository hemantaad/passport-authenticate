module.exports = function (err, req, res, next) {
  console.log("jdahdjas");
  if (err) res.status(500).send("Internal server error.");
};

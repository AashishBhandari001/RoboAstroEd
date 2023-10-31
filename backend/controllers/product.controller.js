const  getProducts = async (req, res) => {
  res.status(200).json({
    message: "route is working fine",
  });
};

module.exports = { getProducts };
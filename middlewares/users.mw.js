const { User } = require("../models");

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userInstance = await User.findByPk(userId);
    if (!userInstance) {
      return res.status(404).send({ data: "User not exists" });
    }
    req.userInstance = userInstance;
    next();
  } catch (error) {
    next(error);
  }
};

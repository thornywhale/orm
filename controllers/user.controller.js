const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    if (!createdUser) {
      res.status(400).send({ data: "Email already exists" });
    }
    createdUser.password = undefined; //JSON doesnt return undefined values
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserStatic = async (req, res, next) => {
  try {
    const {
      body,
      // params: { userId },
      query: { male },
    } = req;
    const [count, updatedUsers] = await User.update(body, {
      // where: { id: userId },
      where: { isMale: male },
      returning: true,
    });
    if (!updatedUsers) {
      return res.status(404).send({ data: "Not found" });
    }
    if (count === 0) {
      return res.status(204).send({ data: "No content" });
    }
    res.status(200).send({ data: updatedUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const updatedUser = await userInstance.update(body);
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    console.log(req.query.male);
    const {
      query: { isMaleVar },
    } = req;
    const users = await User.findAll({
      where: { isMale: isMaleVar || true },
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserStatic = async (req, res, next) => {
  try {
    const {
      query: { male },
    } = req;
    const count = await User.destroy({
      // destroy method returns only amount of deleted items, no reason of naming a variable like 'result' cause there is no another data
      where: { isMale: male },
    });
    if (!result) {
      return res.status(404).send({ data: "Not found" });
    }
    res.status(200).send({ data: count });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    await userInstance.destroy();
    res.status(200).send({ data: "Deleted!" });
  } catch (error) {
    next(error);
  }
};

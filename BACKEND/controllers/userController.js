const User = require("../models/user");

const saveUser = async (req, res) => {
  try {
    const { telegramId, name, username } = req.body;

    if (!telegramId || !name || !username) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ telegramId });
    if (existingUser) {
      return res.status(200).send("User already exists");
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const fetchUser = async (req, res) => {
  try {
    const { telegramId } = req.body;

    if (!telegramId) {
      return res.status(400).send("telegramId is required");
    }

    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  saveUser,
  fetchUser,
};

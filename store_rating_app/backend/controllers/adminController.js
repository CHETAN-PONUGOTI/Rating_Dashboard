const { User, Store, Rating } = require('../models');
const sequelize = require('../config/database');

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.count();
    const storeCount = await Store.count();
    const ratingCount = await Rating.count();
    res.json({ userCount, storeCount, ratingCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'avgRating']
        ]
      },
      include: [{ model: Rating, attributes: [] }],
      group: ['Store.id']
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    
    // Validate input requirements
    if (name.length < 1 || name.length > 60) {
      return res.status(400).json({ error: "Store name must be between 1 and 60 characters." });
    }

    const store = await Store.create({ name, email, address });
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: "Store email must be unique and valid." });
  }
};
const { Store, Rating } = require('../models');
const sequelize = require('../config/database');

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: [
        'id', 'name', 'address',
        [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'avgRating']
      ],
      include: [
        { model: Rating, attributes: [] }
      ],
      group: ['Store.id']
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const [userRating, created] = await Rating.findOrCreate({
      where: { UserId: req.user.id, StoreId: store_id },
      defaults: { rating }
    });

    if (!created) {
      userRating.rating = rating;
      await userRating.save();
    }
    res.json(userRating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const { Store, Rating, User } = require('../models');

exports.getStoreDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({ 
      where: { owner_id: req.user.id },
      include: [{
        model: Rating,
        include: [{ model: User, attributes: ['name', 'email'] }]
      }]
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    const totalRatings = store.Ratings.length;
    const avgRating = totalRatings > 0 
      ? store.Ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings 
      : 0;

    res.json({
      storeName: store.name,
      avgRating,
      totalRatings,
      reviews: store.Ratings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
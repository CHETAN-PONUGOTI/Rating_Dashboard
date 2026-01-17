const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

User.hasOne(Store, { foreignKey: 'owner_id', onDelete: 'CASCADE' });
Store.belongsTo(User, { foreignKey: 'owner_id' });

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

module.exports = { User, Store, Rating };

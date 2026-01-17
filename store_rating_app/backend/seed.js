const sequelize = require('./config/database');
const { Store, User } = require('./models');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    // Force sync deletes existing data to ensure fresh credentials
    await sequelize.sync({ force: true });

    const commonPassword = await bcrypt.hash('Password@123', 10);

    // 1. Create Admin
    const admin = await User.create({
      name: 'System Administrator Account',
      email: 'admin@test.com',
      password: commonPassword,
      address: 'Corporate Headquarters, NY',
      role: 'admin'
    });

    // 2. Create Owner
    const owner = await User.create({
      name: 'Independent Store Owner User',
      email: 'owner@test.com',
      password: commonPassword,
      address: '789 Business Parkway',
      role: 'owner'
    });

    // 3. Create Normal User
    await User.create({
      name: 'Regular Customer Account',
      email: 'user@test.com',
      password: commonPassword,
      address: '123 Residential Street',
      role: 'user'
    });

    // 4. Create Store linked to the Owner
    await Store.create({
      name: 'The Premium Outlet Store',
      email: 'contact@premiumoutlet.com',
      address: 'Lower Ground Floor, Mall of Stars',
      owner_id: owner.id // Linking the store to the owner's ID
    });

    console.log("-----------------------------------------");
    console.log("Database seeded with fresh credentials:");
    console.log("ADMIN: admin@test.com / Password@123");
    console.log("OWNER: owner@test.com / Password@123");
    console.log("USER:  user@test.com / Password@123");
    console.log("-----------------------------------------");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seed();
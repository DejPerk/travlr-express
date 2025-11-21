
const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

const trips = JSON.parse(
  fs.readFileSync('./app_server/data/trips.json', 'utf8')
);

const seedDB = async () => {
  try {
    console.log('Seeding trips collection...');
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Mongoose disconnected after seeding');
    process.exit(0);
  }
};

seedDB();


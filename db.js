const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB-verbinding configureren
    await mongoose.connect('mongodb://localhost:27017/my-mongodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected!');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Afsluiten van de app bij een databasefout
  }
};

module.exports = connectDB;

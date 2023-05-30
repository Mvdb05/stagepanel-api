const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuratie
const mongoDBURI = 'mongodb://localhost:27017/my-mongodb';
mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Verbonden met de MongoDB-database.');
  })
  .catch((error) => {
    console.error('Fout bij het verbinden met de MongoDB-database:', error);
  });

// Routes
const bedrijvenRoutes = require('./routes/bedrijven');
const categorieRoutes = require('./routes/categorie');

app.use('/bedrijven', bedrijvenRoutes);
app.use('/categorie', categorieRoutes);

// Start de server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server gestart op poort ${port}.`);
});

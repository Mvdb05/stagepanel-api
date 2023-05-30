const mongoose = require('mongoose');

// Definieer het schema voor het Categorie-model
const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Voeg andere velden toe aan het schema indien nodig
});

// Definieer het Categorie-model
const Categorie = mongoose.model('Categorie', categorieSchema);

// Exporteer het Categorie-model
module.exports = Categorie;

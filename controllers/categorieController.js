// categorieController.js
const { validationResult } = require('express-validator');
const Categorie = require('../models/Categorie');

// Alle categorieën ophalen
exports.getCategorieën = async (req, res) => {
    try {
        const categorieën = await Categorie.find();
        res.status(200).json(categorieën);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Er is een fout opgetreden bij het ophalen van de categorieën' });
    }
};


// Een nieuwe categorie aanmaken
exports.createCategorie = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const nieuweCategorie = new Categorie({
      naam: name
    });

    const aangemaakteCategorie = await nieuweCategorie.save();

    res.status(201).json({
      message: 'Nieuwe categorie succesvol aangemaakt',
      categorie: aangemaakteCategorie
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het aanmaken van de categorie' });
  }
};

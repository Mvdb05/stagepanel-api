// categorie.js
const express = require('express');
const { body } = require('express-validator');
const { authorize } = require('../middlewares/authorize');
const categorieController = require('../controllers/categorieController');

const router = express.Router();

// Alle categorieën ophalen
router.get('/', categorieController.getCategorieën);

// Nieuwe categorie toevoegen
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Naam is verplicht'),
  ],
  categorieController.createCategorie
);

module.exports = router;

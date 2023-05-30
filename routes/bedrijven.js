const express = require('express');
const { body } = require('express-validator');
const { authorize } = require('../middlewares/authorize.js');
const bedrijvenController = require('../controllers/bedrijvenController.js');

const router = express.Router();

// Alle bedrijven ophalen
router.get('/', bedrijvenController.getBedrijven);

// Nieuw bedrijf toevoegen
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Naam is verplicht'),
    body('categorie').notEmpty().withMessage('Categorie is verplicht'),
    body('location').notEmpty().withMessage('Locatie is verplicht'),
    body('contact').notEmpty().withMessage('Contactgegevens zijn verplicht'),
    body('description').notEmpty().withMessage('Beschrijving is verplicht'),
    body('password').notEmpty().withMessage('Wachtwoord is verplicht'),
  ],
  bedrijvenController.createBedrijf
);

// Bedrijf bijwerken
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Naam is verplicht'),
    body('categorie').notEmpty().withMessage('Categorie is verplicht'),
    body('location').notEmpty().withMessage('Locatie is verplicht'),
    body('contact').notEmpty().withMessage('Contactgegevens zijn verplicht'),
    body('description').notEmpty().withMessage('Beschrijving is verplicht'),
    body('password').notEmpty().withMessage('Wachtwoord is verplicht'),
  ],
  bedrijvenController.updateBedrijf
);

// Bedrijf verwijderen
router.delete('/:id', bedrijvenController.deleteBedrijf);

module.exports = router;

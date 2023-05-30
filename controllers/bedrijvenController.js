const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Bedrijf = require('../models/Bedrijf');

// Functie om een JWT-token te genereren
const generateToken = (userId) => {
  // Vervang 'geheime-sleutel' met een veilige geheime sleutel voor het genereren en verifiëren van tokens
  const secretKey = 'geheime-sleutel';

  // Genereer een JWT-token met de gebruikers-ID als payload
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

  return token;
};

// Alle bedrijven ophalen
exports.getBedrijven = async (req, res) => {
  try {
    const companies = await Bedrijf.find().populate('categorie', 'name');
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het ophalen van de bedrijven.' });
  }
};

// Een nieuw bedrijf toevoegen
exports.createBedrijf = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, categorie, location, contact, description, password } = req.body;

    // Hash het wachtwoord voordat het wordt opgeslagen
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Bedrijf({
      name,
      categorie,
      location,
      contact,
      description,
      password: hashedPassword,
    });

    await newCompany.save();

    // Genereer een JWT-token voor de nieuw geregistreerde gebruiker
    const token = generateToken(newCompany._id);

    res.status(201).json({ company: newCompany, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het toevoegen van het bedrijf.' });
  }
};

// Een bedrijf bijwerken
exports.updateBedrijf = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, categorie, location, contact, description } = req.body;
    const companyId = req.params.id;

    const updatedCompany = await Bedrijf.findByIdAndUpdate(
      companyId,
      {
        name,
        categorie,
        location,
        contact,
        description,
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Bedrijf niet gevonden' });
    }

    res.json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het bijwerken van het bedrijf.' });
  }
};

// Een bedrijf verwijderen
exports.deleteBedrijf = async (req, res) => {
  try {
    const companyId = req.params.id;

    const deletedCompany = await Bedrijf.findByIdAndDelete(companyId);

    if (!deletedCompany) {
      return res.status(404).json({ message: 'Bedrijf niet gevonden' });
    }

    res.json({ message: 'Bedrijf succesvol verwijderd' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het verwijderen van het bedrijf.' });
  }
};

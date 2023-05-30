const mongoose = require('mongoose');

const bedrijfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categorie',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Bedrijf = mongoose.model('Bedrijf', bedrijfSchema);

module.exports = Bedrijf;

var express = require('express');
var app = express.Router();

app.post('/css', (req, res) => {
  // Récupérer les paramètres envoyés depuis le client Vue.js
  const params = req.body;
  
  // Exemple de réponse JSON
  const response = {
    status: 'success',
    message: `Le fichier CSS pour les paramètres ${JSON.stringify(params)} a été récupéré avec succès.`
  };

  // Envoyer la réponse en format JSON
  res.status(200).json(response);
});

module.exports = app;

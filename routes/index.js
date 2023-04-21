var express = require('express');
var app = express.Router();
const path = require('path');

app.post('/css', (req, res) => {
  const params = req.body;
  
  const cssContent = `
    :root {
      --main-color: ${params.mainColor};
      --secondary-color: ${params.secondaryColor};
      --font-size: ${params.fontSize}px;
    }

    /* Autres règles CSS en fonction des paramètres */
  `;

  const tmpFilePath = path.join(__dirname, 'temp.css');
  require('fs').writeFileSync(tmpFilePath, cssContent);

  res.sendFile(tmpFilePath, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération du fichier CSS');
    }

    require('fs').unlinkSync(tmpFilePath);
  })
});

module.exports = app;

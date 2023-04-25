var express = require('express');
var app = express.Router();
const path = require('path');
const fs = require('fs');

app.post('/css', (req, res) => {
  const params = req.body;

  const cssContent = `:root {
  --primary: ${params.colors.primary.default};
  --primary-darken: ${params.colors.primary.darken};
  --primary-lighten: ${params.colors.primary.lighten};
  --dark: ${params.colors.dark.default};
  --dark-darken: ${params.colors.dark.darken};
  --dark-lighten: ${params.colors.dark.lighten};
  --light: ${params.colors.light.default};
  --light-darken: ${params.colors.light.darken};
  --light-lighten: ${params.colors.light.lighten};
}

.container {
  max-width: ${params.container.maxWidth}px;
  padding: ${params.container.padding}px;
}

h1 {
  font-family: ${params.fonts.titles.family};
  font-size:  ${params.fonts.titles.h1.size}px;
  font-weight:  ${params.fonts.titles.h1.weight};
}

h2 {
  font-family: ${params.fonts.titles.family};
  font-size:  ${params.fonts.titles.h2.size}px;
  font-weight:  ${params.fonts.titles.h2.weight};
}

h3 {
  font-family: ${params.fonts.titles.family};
  font-size:  ${params.fonts.titles.h3.size}px;
  font-weight:  ${params.fonts.titles.h3.weight};
}

h4 {
  font-family: ${params.fonts.titles.family};
  font-size:  ${params.fonts.titles.h4.size}px;
  font-weight:  ${params.fonts.titles.h4.weight};
}

h5 {
  font-family: ${params.fonts.titles.family};
  font-size:  ${params.fonts.titles.h5.size}px;
  font-weight:  ${params.fonts.titles.h5.weight};
}

h6 {
  font-family: ${params.fonts.titles.family};
  font-size:  ${params.fonts.titles.h6.size}px;
  font-weight:  ${params.fonts.titles.h6.weight};
}

p {
  font-family: ${params.fonts.paragraphs.family};
  font-size: ${params.fonts.paragraphs.size}px;
}

button {
  background-color: ${params.button.backgroundColor};
  margin: ${params.button.margin}px;
  border-radius: ${params.button.borderRadius}px;
  font-size: ${params.button.fontSize}px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(${params.grid.columns} ,1fr);
  gap: ${params.grid.gap}px;
}

/* Autres règles CSS à ajouter */
  `;

  const tmpFilePath = path.join(__dirname, 'temp.css');
  fs.writeFileSync(tmpFilePath, cssContent);

  res.sendFile(tmpFilePath, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération du fichier CSS');
    }

    fs.unlinkSync(tmpFilePath);
  })
});

module.exports = app;

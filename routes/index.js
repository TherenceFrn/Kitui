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
  background-color: var(--${params.button.backgroundColor});
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

  const tmpFilePath = path.join(__dirname , `../history/${getCurrentDateTime()}.css`);
  fs.writeFileSync(tmpFilePath, cssContent);


  res.status(200).sendFile(tmpFilePath, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération du fichier CSS');
    }

    // fs.unlinkSync(tmpFilePath);
  })
});

app.get('/css', (req, res) => {
  const historyDir = './history';

  fs.readdir(historyDir, (err, files) => {
    if (err) throw err;

    const cssFiles = files.filter(file => path.extname(file) === '.css');

    cssFiles.sort((a, b) => {
      return fs.statSync(`${historyDir}/${b}`).mtime.getTime() -
             fs.statSync(`${historyDir}/${a}`).mtime.getTime();
    });

    const latestFiles = cssFiles.slice(0, 10);

    const urls = latestFiles.map(file => `/history/${file}`);

    res.json(urls);
  });
});

app.get('/cssFile', (req, res) => {
  const filePath = req.query.path;
  if (!filePath) {
    return res.status(400).send('Le chemin du fichier est manquant dans les paramètres de la requête.');
  }
  fs.readFile(path.join(__dirname, '../' + filePath), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Une erreur s\'est produite lors de la lecture du fichier.');
    }
    res.set('Content-Type', 'text/css');
    res.status(200).send(data);
  });
});

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

module.exports = app;

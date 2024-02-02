// Importation des dépendances
const express = require('express');
const ejs = require('ejs');
const app = express();

// Moteur de vue
app.set('view engine', 'ejs');

// Paramètres du serveur
const port = 3000;

app.get('/', function (req, res) {
    res.render('pages/index.ejs');
});

// Lancement du serveur
app.listen(port);
console.log(`Le serveur est lancé sur http://localhost:${port}`);
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config(); // Chargement des variables d'environnement

const app = express();

// Middleware CORS
app.use(cors({
    origin: 'https://www.robot-nc.com', // Autoriser uniquement votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Si vous utilisez des cookies ou des tokens
}));

// Middleware supplémentaire
app.use(morgan('dev')); // Pour les logs des requêtes HTTP
app.use(bodyParser.json()); // Pour parser les requêtes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Pour parser les requêtes URL-encoded

// Gestion des requêtes pré-volées (OPTIONS)
app.options('*', cors()); // Répond aux requêtes pré-volées pour toutes les routes

// Routes de l'application
const usersRouter = require('./routes/users'); // Exemple pour les utilisateurs
app.use('/users', usersRouter); // Mount de la route pour /users

// Route de test pour vérifier le fonctionnement
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running!' });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack); // Log de l'erreur
    res.status(500).json({ error: 'Internal Server Error' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js'; // Import des routes utilisateurs

dotenv.config(); // Chargement des variables d'environnement

const app = express();

// Configuration dynamique des CORS
const allowedOrigins = ['https://www.robot-nc.com', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Origine autorisée
        } else {
            callback(new Error('CORS bloqué : origine non autorisée.'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Autorise les cookies si nécessaires
};

// Middleware CORS
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Répond aux requêtes pré-volées pour toutes les routes

// Middleware supplémentaires
app.use(morgan('dev')); // Logs des requêtes HTTP
app.use(bodyParser.json()); // Parser les requêtes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parser les requêtes URL-encoded

// Routes de l'application
app.use('/users', usersRouter); // Routes pour /users

// Route de test
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running!' });
});

// Gestion des erreurs 404 (Route non trouvée)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    if (err.message === 'CORS bloqué : origine non autorisée.') {
        res.status(403).json({ error: err.message });
    } else {
        console.error(err.stack); // Log de l'erreur
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
});

export default app;

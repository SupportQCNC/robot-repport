import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Configuration des CORS
const allowedOrigins = ['https://www.robot-nc.com', 'http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Autoriser l'origine
        } else {
            callback(new Error('Origine non autorisée par CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permettre l'envoi de cookies
}));

// Gestion des requêtes pré-volées OPTIONS
app.options('*', cors());

// Middleware supplémentaires
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes de l'application
app.use('/users', usersRouter);

// Route de test
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running!' });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.message === 'Origine non autorisée par CORS') {
        res.status(403).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
});

export default app;

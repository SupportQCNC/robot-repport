import mongoose from "mongoose";

const testMongoConnection = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/robot-nc"; // Remplacez par votre URI locale
    console.log("Tentative de connexion à MongoDB avec URI :", mongoURI);

    await mongoose.connect(mongoURI);

    console.log("Connexion MongoDB réussie !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error.message);
    process.exit(1);
  }
};

testMongoConnection();

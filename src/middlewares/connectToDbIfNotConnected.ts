import mongoose from "mongoose";

const connectToDbIfNotConnected = async () => {
	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) {
		throw new Error(
			"MONGODB_URI n'est pas défini dans les variables d'environnement"
		);
	}

	if (mongoose.connection.readyState === 0) {
		return mongoose.connect(mongoUri);
	}
};

export default connectToDbIfNotConnected;

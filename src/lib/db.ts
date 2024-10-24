import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri: string = process.env.MONGODB_URI;
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
	// En mode développement, utiliser une variable globale pour que la valeur
	// soit préservée à travers les rechargements de modules causés par HMR (Hot Module Replacement).
	const globalWithMongo = global as typeof globalThis & {
		_mongoClient?: MongoClient;
	};

	if (!globalWithMongo._mongoClient) {
		globalWithMongo._mongoClient = new MongoClient(uri, options);
	}
	client = globalWithMongo._mongoClient;
} else {
	// En mode production, il est préférable de ne pas utiliser de variable globale.
	client = new MongoClient(uri, options);
}

// Exporter un MongoClient à portée de module. En faisant cela dans un
// module séparé, le client peut être partagé entre les fonctions.
export default client;
